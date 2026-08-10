export interface FormSegment {
  id: number;
  name: string;
  value: boolean;
}

export const formSegmentDefaultSettings: FormSegment[] = [
  {
    id: 1,
    name: 'Tenue de travail réglementaire',
    value: false,
  },
  {
    id: 2,
    name: 'Tenue de poste de travail',
    value: false,
  },
  {
    id: 3,
    name: 'équipements et matériels',
    value: false,
  },
  {
    id: 4,
    name: 'Carte professionnelle',
    value: false,
  },
  {
    id: 5,
    name: 'Tests et fonct. du pti',
    value: false,
  }
]
