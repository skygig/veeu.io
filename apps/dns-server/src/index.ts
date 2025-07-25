import { createSocket } from "dgram";

import getRecords from "./utils/getRecords";
import handleDNSquery from "./utils/dnsHandler";
import records from "./utils/records";

export const server = createSocket("udp4");

server.on("error", (err) => {
  console.error("Server error:", err);
  server.close();
});

server.on("message", handleDNSquery);

server.on("listening", async () => {
  const address = server.address();
  console.log(`DNS Server is running on ${address.address}:${address.port}`);

  const newRecords = await getRecords();
  records.set(newRecords);
});

server.bind(53, () => {});
