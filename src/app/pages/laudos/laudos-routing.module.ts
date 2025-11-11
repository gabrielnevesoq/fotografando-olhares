import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaudosPage } from './laudos.page';

const routes: Routes = [
  {
    path: '',
    component: LaudosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaudosPageRoutingModule {}
