import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { Supabase } from 'src/app/services/supabase';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-modal-laudo',
  templateUrl: './modal-laudo.component.html',
  styleUrls: ['./modal-laudo.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  providers: [Supabase]
})
export class ModalLaudoComponent  implements OnInit {
  constructor(private modalController: ModalController, private supabase: Supabase, private router: Router, private loadingController: LoadingController) {}
  ngOnInit() {
    this.GetPacientes();
  }

  // Dados recebidos do pai
  @Input() nome: string = "";

  // Fechar o modal
  FecharModal() {
    this.modalController.dismiss();
  }

  // Confirmar modal
  ConfirmarModal() {
    this.modalController.dismiss({
      confirmado: true,
      mensagem: "Usuário confirmou."
    });
  }

  // Pegando pacientes
  public pacientes: any[] = [];
  async GetPacientes() {
    const {data, error} = await this.supabase.GetPacientes();
    if (error) {
      console.error(error);
    } else {
      this.pacientes = data;
    }
  }

  // Cadastrando laudo novo
  public id_paciente       : number = 0;
  public nome_responsavel  : string = "";
  public data_preenchimento: string = "";
  public resultado_laudo   : string = "";
  public descricao         : string = "";
  public outras_alteracoes : string = "";
  async InsertLaudo() {
    // Mostra loading (opcional, mas recomendado)
    const loading = await this.loadingController.create({
      message: 'Salvando laudo...',
    });
    await loading.present();

    const { error } = await this.supabase.InsertLaudo(
      this.id_paciente,
      this.nome_responsavel,
      this.data_preenchimento,
      this.resultado_laudo,
      this.descricao,
      this.outras_alteracoes,
    );

    // Fecha o loading
    await loading.dismiss();

    if (error) {
      // ERRO: Mostra alerta vermelho
      await this.mostrarAlerta({
        titulo: 'Erro ao salvar',
        mensagem: error.message || 'Tente novamente mais tarde.',
        tipo: 'error',
        botaoCancelar: false
      });
      console.error('Erro ao inserir laudo:', error);
    } else {
      // SUCESSO: Mostra alerta verde
      await this.mostrarAlerta({
        titulo: 'Sucesso!',
        mensagem: 'Laudo salvo com sucesso.',
        tipo: 'success',
        botaoCancelar: false
      });

      // Opcional: limpar formulário ou navegar
    }
  }

  // Mostrando o alerta
  private async mostrarAlerta(opcoes: any) {
    const modal = await this.modalController.create({
      component: AlertComponent,
      componentProps: {
        titulo: opcoes.titulo,
        mensagem: opcoes.mensagem,
        tipo: opcoes.tipo,
        botaoCancelar: opcoes.botaoCancelar || false,
        textoConfirmar: opcoes.textoConfirmar || 'OK'
      },
      cssClass: 'alerta-modal',
      backdropDismiss: false
    });

    await modal.present();
    await modal.onDidDismiss();
  }

  // Pegando mensagem do alerta
  getMensagem(tipo: string) {
    const msgs = {
      success: 'Tudo funcionou perfeitamente!',
      error: 'Ocorreu um erro inesperado.',
      warning: 'Você tem certeza disso?',
      info: 'Aqui vai uma informação importante.'
    };
    return msgs[tipo as keyof typeof msgs];
  }
}