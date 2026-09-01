import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternalControlsPageRoutingModule } from './internal-controls-routing.module';

import { InternalControlsPage } from './internal-controls.page';
import {EditingWindowICComponent} from "../editing-window-ic/editing-window-ic.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InternalControlsPageRoutingModule,
        EditingWindowICComponent
    ],
  declarations: [InternalControlsPage]
})
export class InternalControlsPageModule {}
