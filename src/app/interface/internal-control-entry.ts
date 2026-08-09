export interface InternalControlEntry {
  agentName: string;
  domainName: string;
  entryDate: string;
  equipment: boolean;
  professionalCard: boolean;
  requiredWorkClothing: boolean;
  workstationSetup: boolean;
  pti: boolean;
  comment:string;
}

export const InternalControlEntryDefaultSettings: InternalControlEntry = {
  agentName: "",
  domainName: "",
  entryDate: "",
  equipment: false,
  professionalCard: false,
  requiredWorkClothing: false,
  workstationSetup: false,
  pti: false,
  comment: "",
}
