export interface FormSegment {
  id: number;
  name: string;
  displayName: string;
  value: boolean;
}

export function formSegmentDefaultSettings(): FormSegment[] {
  return [
    {
      id: 1,
      name: 'requiredworkuniform',
      displayName: 'Tenue de travail réglementaire',
      value: false,
    },
    {
      id: 2,
      name: 'workstationuniform',
      displayName: 'Tenue de poste de travail',
      value: false,
    },
    {
      id: 3,
      name: 'equipmentmaterials',
      displayName: 'Équipements et Matériels',
      value: false,
    },
    {
      id: 4,
      name: 'professionalcard',
      displayName: 'Carte professionnelle',
      value: false,
    },
    {
      id: 5,
      name: 'ptiisworking',
      displayName: 'Tests et fonct. du pti',
      value: false,
    }
  ]
}
