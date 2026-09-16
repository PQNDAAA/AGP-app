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

export function internalControlEntryDefaultSettings(): InternalControlEntry {
  return {
    entryDate: new Date().toISOString(),
    entryDateDisplay: "",
    agentName: "",
    domainName: "",
    booleans: formSegmentDefaultSettings(),
    comment: "",
    professionalCardNumber: "",
  };
}
