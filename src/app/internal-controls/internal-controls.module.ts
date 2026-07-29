import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternalControlsPageRoutingModule } from './internal-controls-routing.module';

import { InternalControlsPage } from './internal-controls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternalControlsPageRoutingModule
  ],
  declarations: [InternalControlsPage]
})
export class InternalControlsPageModule {}
