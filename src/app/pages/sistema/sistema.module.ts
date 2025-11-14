import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SistemaPageRoutingModule } from './sistema-routing.module';

import { SistemaPage } from './sistema.page';
import { SidemenuComponent } from 'src/app/components/sidemenu/sidemenu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SistemaPageRoutingModule,
    SidemenuComponent
  ],
  declarations: [SistemaPage]
})
export class SistemaPageModule {}
