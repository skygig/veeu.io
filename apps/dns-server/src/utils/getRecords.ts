import prisma from "database";

const getRecords = async () => {
  try {
    const records = await prisma.record.findMany();

    const newRecords: { [key: string]: { [key: string]: string } } = {
      A: {
        "veeu.io": "76.76.21.21",
        "ns1.veeu.io": "3.84.135.102",
        "ns2.veeu.io": "3.84.135.102",
      },
      CNAME: {
        "www.veeu.io": "veeu.io",
      },
    };

    records.forEach((record) => {
      if (!newRecords[record.type]) {
        newRecords[record.type] = {};
      }
      newRecords[record.type][record.domainId] = record.value;
    });

    return newRecords;
  } catch (err) {
    console.error("Unable to fetch Domains or Records!");
    console.error(err);
    throw new Error("Failed to get records.");
  }
};

export default getRecords;
