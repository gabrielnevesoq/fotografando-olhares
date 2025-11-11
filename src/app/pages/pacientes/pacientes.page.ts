import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPacientesComponent } from 'src/app/components/modal-pacientes/modal-pacientes.component';
import { Supabase } from 'src/app/services/supabase';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
  standalone: false,
  providers: [Supabase]
})
export class PacientesPage implements OnInit {
  constructor(private supabase: Supabase, private modalController: ModalController) { }
  ngOnInit() {
    this.GetPacientes();
    this.FilterPacientes();
  }

  // Pegando pacientes
  public pacientes: any[] = [];
  async GetPacientes() {
    const {data, error} = await this.supabase.GetPacientes();
    if (error) {
      console.error(error);
    } else {
      this.pacientes = data;
      this.pacientes_filtrados = [...this.pacientes]; // Inicializa com todos
    }
  }

  // Filtrando pacientes
  public termo_pesquisa: string = "";
  public pacientes_filtrados: any[] = [...this.pacientes];
  async FilterPacientes() {
    const termo = this.termo_pesquisa.trim().toUpperCase();

    if (!termo) {
      this.pacientes_filtrados = [...this.pacientes];
    } else {
      this.pacientes_filtrados = this.pacientes.filter(paciente => {
        // Ajuste os campos conforme sua tabela (ex: nome, cpf, email)
        const nome  = (paciente.nome  || '').toUpperCase();
        const cpf   = (paciente.cpf   || '').toUpperCase();
        const email = (paciente.email || '').toUpperCase();

        return nome.includes(termo) || cpf.includes(termo) || email.includes(termo);
      });
    }
  }

  // Abrindo modal de cadastro
    async AbrirModal() {
      const modal = await this.modalController.create({
        component: ModalPacientesComponent,
        componentProps: {
          nome: 'João' // Passando dados para o modal
        },
        cssClass: 'meu-modal-css' // Opcional: classe personalizada
      });
  
      modal.present();
  
      const { data } = await modal.onWillDismiss(); // ou onDidDismiss()
      if (data?.confirmado) {
        console.log('Usuário confirmou:', data.mensagem);
      }
    }
}