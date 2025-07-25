type RecordsType = { [type: string]: { [name: string]: string } };

class DNSRecord {
  records: RecordsType;

  constructor() {
    this.records = {
      A: {
        "veeu.io": "76.76.21.21",
        "ns1.veeu.io": "3.84.135.102",
        "ns2.veeu.io": "3.84.135.102",
      },
      CNAME: {
        "www.veeu.io": "veeu.io",
      },
    };
  }

  addOrUpdate(type: string, name: string, value: string) {
    if (!this.records[type]) {
      this.records[type] = {};
    }
    this.records[type][name.toLowerCase()] = value;
  }

  delete(type: string, name: string) {
    const typeRecords = this.records[type];
    if (typeRecords && name.toLowerCase() in typeRecords) {
      delete typeRecords[name.toLowerCase()];
    }
  }

  get(type: string, name: string): string | undefined {
    return this.records[type]?.[name.toLowerCase()];
  }

  set(records: RecordsType) {
    this.records = records;
  }
}

const records = new DNSRecord();

export default records;
