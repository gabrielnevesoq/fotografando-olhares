import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaudosPageRoutingModule } from './laudos-routing.module';

import { LaudosPage } from './laudos.page';
import { SidemenuComponent } from 'src/app/components/sidemenu/sidemenu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaudosPageRoutingModule,
    SidemenuComponent
  ],
  declarations: [LaudosPage]
})
export class LaudosPageModule {}
