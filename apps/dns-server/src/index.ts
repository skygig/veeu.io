import { createSocket } from "dgram";
import { decode, encode, AUTHORITATIVE_ANSWER } from "dns-packet";
import { promises as dnsPromises } from "dns";
import getRecords from "./utils/getRecords";

const server = createSocket("udp4");

server.on("error", (err) => {
  console.error("Server error:", err);
  server.close();
});

let records: { [key: string]: { [key: string]: string } } = {};

server.on("message", async (msg, remoteInfo) => {
  const incomingReq = decode(msg);
  const dnsQuestions = incomingReq.questions;

  if (!dnsQuestions || dnsQuestions.length === 0) {
    console.warn("No questions in DNS request");
    return;
  }

  const reqDomain = dnsQuestions[0].name.toLowerCase();
  const reqType = dnsQuestions[0].type;

  console.log("----------------------------------------------------");
  console.log("DNS Question : ", dnsQuestions);
  console.log("Remote Info :", remoteInfo);
  console.log("____________________________________________________");

  let response;
  if (["A", "CNAME"].includes(reqType)) {
    response = records[reqType][reqDomain!];
  }

  if (reqType === "A" && !response && records.CNAME[reqDomain]) {
    const cnameDomain = records.CNAME[reqDomain];

    try {
      const addresses = await dnsPromises.resolve4(cnameDomain);
      if (addresses.length > 0) response = addresses[0];
    } catch (error) {
      console.error(`Failed to resolve CNAME record: ${cnameDomain}:`, error);
    }
  }

  if (reqType && response) {
    const ans = encode({
      type: "response",
      id: incomingReq.id,
      flags: AUTHORITATIVE_ANSWER,
      questions: dnsQuestions,
      answers: [
        {
          type: reqType === "A" ? "A" : "CNAME",
          class: "IN",
          name: reqDomain!,
          data: response,
        },
      ],
    });

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
});

// When the server starts listening, log the address and port information
server.on("listening", async () => {
  const address = server.address();
  console.log(`DNS Server is running on ${address.address}:${address.port}`);

  const newRecords = await getRecords();
  records = newRecords || {};
});

server.bind(53, () => {});
