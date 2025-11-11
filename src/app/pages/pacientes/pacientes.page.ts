import { Component, OnInit } from '@angular/core';
import { Supabase } from 'src/app/services/supabase';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
  standalone: false,
  providers: [Supabase]
})
export class PacientesPage implements OnInit {
  constructor(private supabase: Supabase) { }
  ngOnInit() {
    this.GetPacientes();
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
}