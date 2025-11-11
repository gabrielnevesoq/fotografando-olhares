import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacientesPageRoutingModule } from './pacientes-routing.module';

import { PacientesPage } from './pacientes.page';
import { SidemenuComponent } from 'src/app/components/sidemenu/sidemenu.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { ModalPacientesComponent } from 'src/app/components/modal-pacientes/modal-pacientes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacientesPageRoutingModule,
    SidemenuComponent,
    AlertComponent,
    ModalPacientesComponent
  ],
  declarations: [PacientesPage]
})
export class PacientesPageModule {}
