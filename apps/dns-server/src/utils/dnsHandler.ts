import { decode, encode, AUTHORITATIVE_ANSWER, Packet } from "dns-packet";
import { promises as dnsPromises } from "dns";
import { Buffer } from "buffer";
import { RemoteInfo } from "dgram";

import { server } from "../index";
import records from "./records";

const handleDNSquery = async (msg: Buffer, remoteInfo: RemoteInfo) => {
  const incomingReq = decode(msg);
  const dnsQuestions = incomingReq.questions;

  if (!dnsQuestions || dnsQuestions.length === 0) {
    console.warn("No questions in DNS request");
    return;
  }

  const question = dnsQuestions[0];
  const reqDomain = question.name.toLowerCase();
  const reqType = question.type;

  console.log("----------------------------------------------------");
  console.log("DNS Question : ", dnsQuestions);
  console.log("Remote Info :", remoteInfo);
  console.log("____________________________________________________");

  // Base response packet
  const responsePacket: Packet = {
    type: "response",
    id: incomingReq.id,
    flags: AUTHORITATIVE_ANSWER,
    questions: dnsQuestions,
    answers: [],
  };

  const directResponse = records.get(reqType, reqDomain);
  const cnameResponse = records.get("CNAME", reqDomain);

  if (reqType === "A" && directResponse) {
    // 1. Direct A record found
    responsePacket.answers?.push({
      type: "A",
      class: "IN",
      name: reqDomain,
      data: directResponse,
    });
  } else if (reqType === "CNAME" && directResponse) {
    // 2. Direct CNAME record found
    responsePacket.answers?.push({
      type: "CNAME",
      class: "IN",
      name: reqDomain,
      data: directResponse,
    });
  } else if (reqType === "A" && cnameResponse) {
    // 3. CNAME found for an A record request (Corrected Logic) : Return both CNAME and the resolved A record
    try {
      const addresses = await dnsPromises.resolve4(cnameResponse);
      if (addresses.length > 0) {
        responsePacket.answers?.push({
          type: "CNAME",
          class: "IN",
          name: reqDomain,
          data: cnameResponse,
        });
        responsePacket.answers?.push({
          type: "A",
          class: "IN",
          name: cnameResponse,
          data: addresses[0],
        });
      }
    } catch (error) {
      console.error(`Failed to resolve CNAME record: ${cnameResponse}:`, error);
    }
  }

  if (responsePacket.answers && responsePacket.answers.length > 0) {
    const ans = encode(responsePacket);
    server.send(ans, remoteInfo.port, remoteInfo.address);
  } else {
    // Handle non-existent domain
    const nxdomainResponse = encode({
      type: "response",
      id: incomingReq.id,
      flags: 0x8183, // NXDOMAIN flag
      questions: dnsQuestions,
      answers: [],
    });
    server.send(nxdomainResponse, remoteInfo.port, remoteInfo.address);
  }
};

export default handleDNSquery;
