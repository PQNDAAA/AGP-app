export interface FormSegment {
  id: number;
  name: string;
  displayName: string;
  value: boolean;
}

export const formSegmentDefaultSettings: FormSegment[] = [
  {
    id: 1,
    name: 'requiredWorkUniform',
    displayName: 'Tenue de travail réglementaire',
    value: false,
  },
  {
    id: 2,
    name: 'workStationUniform',
    displayName: 'Tenue de poste de travail',
    value: false,
  },
  {
    id: 3,
    name: 'equipmentMaterials',
    displayName: 'équipements et matériels',
    value: false,
  },
  {
    id: 4,
    name: 'professionalCard',
    displayName: 'Carte professionnelle',
    value: false,
  },
  {
    id: 5,
    name: 'ptiIsWorking',
    displayName: 'Tests et fonct. du pti',
    value: false,
  }
]
