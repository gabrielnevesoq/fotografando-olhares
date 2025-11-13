import { Component, Input, OnInit } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { Supabase } from 'src/app/services/supabase';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-modal-pacientes',
  templateUrl: './modal-pacientes.component.html',
  styleUrls: ['./modal-pacientes.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  providers: [Supabase]
})
export class ModalPacientesComponent  implements OnInit {
constructor(private modalController: ModalController, private supabase: Supabase, private router: Router, private loadingController: LoadingController) {}
  ngOnInit() {
    this.GetPacientes();
  }

  // Fechar o modal
  FecharModal() {
    this.modalController.dismiss();
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
  public nome_paciente : string = "";
  public sexo : string = "";
  public cpf  : string = "";
  public cns  : string = "";
  public data_nascimento : string = "";
  public remedios   : string = "";
  public diagnostico: string = "";
  public atividade_fisica: string = "";
  public outra_patologia : string = "";
  public insulina     : string = "";
  public tabagista    : string = "";
  public ultimo_exame : string = "";
  async InsertPaciente() {
    // Tratativa: Sem nome
    if (this.nome_paciente === "") {
      await this.mostrarAlerta({
        titulo: 'Erro ao salvar',
        mensagem: 'Escreva um nome para o paciente.',
        tipo: 'error',
        botaoCancelar: false
      });
      return;
    }
    // Tratativa: Sem cpf
    if (this.cpf === "") {
      await this.mostrarAlerta({
        titulo: 'Erro ao salvar',
        mensagem: 'O paciente deve conter um cpf.',
        tipo: 'error',
        botaoCancelar: false
      });
      return;
    }
    // Tratativa: Data de nascimento
    if (this.data_nascimento === "") {
      await this.mostrarAlerta({
        titulo: 'Erro ao salvar',
        mensagem: 'O paciente deve conter uma data de nascimento.',
        tipo: 'error',
        botaoCancelar: false
      });
      return;
    }
    // Tratativa: Diagnostico
    if (this.diagnostico === "") {
      await this.mostrarAlerta({
        titulo: 'Erro ao salvar',
        mensagem: 'O paciente deve conter um diagnóstico válido.',
        tipo: 'error',
        botaoCancelar: false
      });
      return;
    }
    // Tratativa: Outra patologia
    if (this.diagnostico === "Outra Patologia") {
      this.diagnostico = this.outra_patologia;
    }

    // Mostra loading (opcional, mas recomendado)
    const loading = await this.loadingController.create({
      message: 'Salvando paciente...',
    });
    await loading.present();

    const { error } = await this.supabase.InsertPaciente(
      this.nome_paciente, this.sexo, this.cpf, this.cns, this.data_nascimento, this.remedios, this.diagnostico,
      this.insulina, this.tabagista, this.atividade_fisica, this.ultimo_exame
    );

    // Fecha o loading
    await loading.dismiss();

    // Erro de conexão
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

  // Campo de cpf
  onCpfInput(event: any) {
    let v = event.target.value.replace(/\D/g, '').substring(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    event.target.value = v;
  }

  // Tratativa de cns
  formatarCNS(event: any) {
    let valor = event.target.value;

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, '');

    // Limita a 15 dígitos
    valor = valor.substring(0, 15);

    // Aplica a máscara: 000 0000 0000 0000
    valor = valor.replace(/(\d{3})(\d)/, '$1 $2');
    valor = valor.replace(/(\d{4})(\d)/, '$1 $2');
    valor = valor.replace(/(\d{4})(\d)/, '$1 $2');

    // Atualiza o campo
    event.target.value = valor;
  }

  // Data de nascimento
  formatarDataNascimento(event: any) {
    let valor = event.target.value;

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, '');

    // Limita a 8 dígitos
    valor = valor.substring(0, 8);

    // Aplica a máscara: DD/MM/AAAA
    if (valor.length > 2) {
      valor = valor.substring(0, 2) + '/' + valor.substring(2);
    }
    if (valor.length > 5) {
      valor = valor.substring(0, 5) + '/' + valor.substring(5, 9);
    }

    // Validação parcial (evita entradas inválidas)
    const partes = valor.split('/');
    let dia = partes[0] ? parseInt(partes[0], 10) : 0;
    let mes = partes[1] ? parseInt(partes[1], 10) : 0;
    let ano = partes[2] ? parseInt(partes[2], 10) : 0;

    const anoAtual = new Date().getFullYear();

    // Valida dia (01-31)
    if (dia > 31) dia = 31;
    if (dia < 1) dia = 1;

    // Valida mês (01-12)
    if (mes > 12) mes = 12;
    if (mes < 1) mes = 1;

    // Valida ano (1900 até ano atual)
    if (ano > anoAtual) ano = anoAtual;
    if (ano < 1900) ano = 1900;

    // Reconstrói com validação
    let novaData = '';
    if (valor.length >= 1) novaData += dia.toString().padStart(2, '0');
    if (valor.length >= 3) novaData += '/' + mes.toString().padStart(2, '0');
    if (valor.length >= 6) novaData += '/' + ano.toString().padStart(4, '0');

    event.target.value = novaData;
  }
}