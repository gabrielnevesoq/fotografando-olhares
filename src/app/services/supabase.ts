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

  // Pegando dados do usuário
  user_test: string = "360e2801-de14-4d43-adb4-7dc66f12b750";
  async GetUserData() {
    return await this.supabase.from("tbl_usuarios").select('*').eq('user_id', this.user_test);
  }
}