import { createSocket } from "dgram";
import express from "express";
import { config } from "dotenv";
config();

import getRecords from "./utils/getRecords";
import updateRecord from "./utils/updateRecord";
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

// Express Server
const api = express();
const API_PORT = 8080;
api.use(express.json());

api.post("/update-record", updateRecord);

api.listen(API_PORT, () => {
  console.log(`API listening on http://localhost:${API_PORT}`);
});
