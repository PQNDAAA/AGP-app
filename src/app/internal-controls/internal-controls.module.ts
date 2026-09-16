import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternalControlsPageRoutingModule } from './internal-controls-routing.module';

import { InternalControlsPage } from './internal-controls.page';
import {InternalControlsAddComponent} from "../internal-controls-add/internal-controls-add.component";
import {InternalControlsViewComponent} from "../internal-controls-view/internal-controls-view.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternalControlsPageRoutingModule,
    InternalControlsAddComponent,
    InternalControlsViewComponent
  ],
  declarations: [InternalControlsPage]
})
export class InternalControlsPageModule {}
