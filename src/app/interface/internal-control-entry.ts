import {FormSegment, formSegmentDefaultSettings} from "./form-segment";

export interface InternalControlEntry {
  id?: number,
  entryDate: string;
  entryDateDisplay: string;
  agentName: string;
  domainName: string;
  booleans: FormSegment[];
  comment:string;
  professionalCardNumber:string;
}

export const InternalControlEntryDefaultSettings: InternalControlEntry = {
  entryDate: new Date().toISOString(),
  entryDateDisplay: "",
  agentName: "",
  domainName: "",
  booleans: structuredClone(formSegmentDefaultSettings),
  comment: "",
  professionalCardNumber: "",
}
