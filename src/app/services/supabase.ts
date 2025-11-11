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
}