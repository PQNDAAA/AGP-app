import {FormSegment, formSegmentDefaultSettings} from "./form-segment";

export interface InternalControlEntry {
  entryDate: string;
  entryDateDisplay: string;
  agentName: string;
  domainName: string;
  segmentList: FormSegment[];
  comment:string;
}

export const InternalControlEntryDefaultSettings: InternalControlEntry = {
  entryDate: new Date().toISOString(),
  entryDateDisplay: "",
  agentName: "",
  domainName: "",
  segmentList: formSegmentDefaultSettings,
  comment: "",
}
