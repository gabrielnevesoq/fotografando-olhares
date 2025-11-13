import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(environment.supabase_url, environment.supabase_key);
  }

  // Fazendo Login
  async Login(email: string, senha: string) {
    return await this.supabase.auth.signInWithPassword({email: email, password: senha});
  }

  // Fazendo LogOut
  async LogOut() {
    return await this.supabase.auth.signOut();
  }

  // Pegando o usuário
  async GetUser() {
    return await this.supabase.auth.getUser();
  }

  // Pegando dados do usuário
  async GetUserData(user_id: string) {
    return await this.supabase.from("tbl_usuarios").select('*').eq('user_id', user_id);
  }

  // Pegando pacientes
  async GetPacientes() {
    return await this.supabase.from("tbl_pacientes").select('*');
  }
  async GetPacientesById(id: number) {
    return await this.supabase.from("tbl_pacientes").select('*').eq('id', id);
  }

  // Pegando os laudos
  async GetLaudos() {
    return await this.supabase.from("tbl_laudos").select('*');
  }

  // Cadastrando laudo novo
  async InsertLaudo(
    id_paciente: number, nome_responsavel: string, data_preenchimento: string, resultado_laudo: string, 
    descricao: string, outras_alteracoes: string,
  ) {
    return await this.supabase.from("tbl_laudos").insert({
      id_paciente: id_paciente, nome_responsavel: nome_responsavel, data_preenchimento: data_preenchimento,
      resultado_laudo: resultado_laudo, descricao: descricao, outras_alteracoes: outras_alteracoes,
    });
  }

  // Cadastrando paciente novo
  async InsertPaciente(
    nome: string, sexo: string, cpf: string, cns: string, data_nascimento: string, remedios: string, diagnostico: string,
    insulina: string, tabagista: string, atividade_fisica: string, ultimo_exame: string, 
    tempo_diabetes: string, tempo_hipertensao: string
  ) {
    return await this.supabase.from("tbl_pacientes").insert({
      nome: nome, sexo: sexo, cpf: cpf, cns: cns, data_nascimento: data_nascimento, remedios: remedios, diagnostico: diagnostico,
      insulina: insulina, tabagista: tabagista, atividade_fisica: atividade_fisica, ultimo_exame: ultimo_exame,
      tempo_diabetes: tempo_diabetes, tempo_hipertensao: tempo_hipertensao
    })
  }
}