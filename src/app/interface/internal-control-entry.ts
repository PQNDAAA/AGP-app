import {FormSegment, formSegmentDefaultSettings} from "./form-segment";

export interface InternalControlEntry {
  agentName: string;
  domainName: string;
  entryDate: string;
  segmentList: FormSegment[];
  comment:string;
}

export const InternalControlEntryDefaultSettings: InternalControlEntry = {
  agentName: "",
  domainName: "",
  entryDate: "",
  segmentList: formSegmentDefaultSettings,
  comment: "",
}
