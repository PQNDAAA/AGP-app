import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternalControlsPage } from './internal-controls.page';

const routes: Routes = [
  {
    path: '',
    component: InternalControlsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternalControlsPageRoutingModule {}
