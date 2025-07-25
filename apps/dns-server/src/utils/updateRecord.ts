import { Request, Response } from "express";
import z from "zod";
import records from "./records";

const eventBody = z.object({
  event: z.enum(["update", "delete", "new"]),
  type: z.enum(["A", "CNAME", "AAAA", "MX"]),
  name: z.string(),
  value: z.string(),
});

const updateRecord = (req: Request, res: Response) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body cannot be empty." });
  }

  const validEvent = eventBody.safeParse(req.body);
  if (!validEvent.success) {
    return res.status(400).json({
      message: "Invalid body format.",
      errors: validEvent.error.format(),
    });
  }

  const secretToken = req.headers.authorization;
  if (process.env.SECRET_KEY !== secretToken) {
    return res.status(403).json({ message: "Unauthorized!" });
  }

  const data = validEvent.data;
  const recordName = data.name.toLowerCase();

  if (data.event === "delete") {
    records.delete(data.type, recordName);
  } else if (data.event === "new" || data.event === "update") {
    records.addOrUpdate(data.type, recordName, data.value);
  }

  return res.status(200).json({ message: "Records updated!" });
};

export default updateRecord;
