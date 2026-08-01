import { Component, OnInit } from '@angular/core';
import {FormSegment} from "../interface/form-segment";

@Component({
  selector: 'app-internal-controls',
  templateUrl: './internal-controls.page.html',
  styleUrls: ['./internal-controls.page.scss'],
  standalone: false
})
export class InternalControlsPage implements OnInit {

  segmentList: FormSegment[] = [
    {
      name: 'Tenue de travail réglementaire'
    },
    {
      name: 'Tenue de poste de travail'
    },
    {
      name: 'équipements et matériels'
    },
    {
      name: 'carte professionnelle'
    },
    {
      name: 'Tests et fonct. du pti'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
