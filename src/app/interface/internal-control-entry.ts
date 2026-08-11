import {FormSegment, formSegmentDefaultSettings} from "./form-segment";

export interface InternalControlEntry {
  agentName: string;
  domainName: string;
  entryDate: string;
  entryDateDisplay: string;
  segmentList: FormSegment[];
  comment:string;
}

export const InternalControlEntryDefaultSettings: InternalControlEntry = {
  agentName: "",
  domainName: "",
  entryDate: new Date().toISOString(),
  entryDateDisplay: "",
  segmentList: formSegmentDefaultSettings,
  comment: "",
}
