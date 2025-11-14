import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalLaudoComponent } from 'src/app/components/modal-laudo/modal-laudo.component';
import { Supabase } from 'src/app/services/supabase';

@Component({
  selector: 'app-laudos',
  templateUrl: './laudos.page.html',
  styleUrls: ['./laudos.page.scss'],
  standalone: false,
  providers: [Supabase]
})
export class LaudosPage implements OnInit {
  constructor(private supabase: Supabase, private modalController: ModalController) { }
  ngOnInit() {
    this.carregarDados();
  }

  // Carregando os dadios
  async carregarDados() {
    try {
      // Espera AMBAS as chamadas terminarem
      await Promise.all([this.GetLaudos(), this.GetPacientes()]);
      
      // SÓ AGORA aplica o filtro (com dados reais)
      this.aplicarFiltro();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }

  // Pegando os laudos
  public laudos: any[] = [];
  async GetLaudos() {
    const {data, error} = await this.supabase.GetLaudos();
    if (error) {
      console.error(error);
    } else {
      this.laudos = data;
    }
  }

  // Pegando pacientes pelo id
  public pacientes: any[] = [];
  async GetPacientes() {
    const {data, error} = await this.supabase.GetPacientes();
    if (error) {
      console.error(error);
    } else {
      this.pacientes = data;
    }
  }

  // Pegando o nome do paciente
  PacienteName(id: number) {
    const paciente = this.pacientes.find(paciente => paciente.id === id);
    const nome = paciente ? paciente.nome : null;
    return nome
  }

  // Filtrando os laudos
  public termo_pesquisa: string = "";
  public laudos_filtrados: any[] = [];
  FilterLaudos() {
    this.aplicarFiltro();
  }
  private aplicarFiltro() {
    const termo = this.normalizar(this.termo_pesquisa.trim());

    if (!termo) {
      this.laudos_filtrados = [...this.laudos]; // ← MOSTRA TODOS
      return;
    }

    this.laudos_filtrados = this.laudos.filter(laudo => {
      const paciente = this.pacientes.find(p => p.id === laudo.paciente_id);
      if (!paciente?.nome) return false;
      return this.normalizar(paciente.nome).includes(termo);
    });
  }

  // Remove acentos e deixa minúsculo
  private normalizar(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // Abrindo modal de cadastro
  async AbrirModal() {
    const modal = await this.modalController.create({
      component: ModalLaudoComponent,
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