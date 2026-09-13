import {FormSegment, formSegmentDefaultSettings} from "./form-segment";

export interface InternalControlEntry {
  entrydate: string;
  entryDateDisplay: string;
  agentname: string;
  domainname: string;
  booleans: FormSegment[];
  comment:string;
}

export const InternalControlEntryDefaultSettings: InternalControlEntry = {
  entrydate: new Date().toISOString(),
  entryDateDisplay: "",
  agentname: "",
  domainname: "",
  booleans: structuredClone(formSegmentDefaultSettings),
  comment: "",
}
