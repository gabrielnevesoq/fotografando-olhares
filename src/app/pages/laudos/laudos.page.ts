import { Component, OnInit } from '@angular/core';
import { Supabase } from 'src/app/services/supabase';

@Component({
  selector: 'app-laudos',
  templateUrl: './laudos.page.html',
  styleUrls: ['./laudos.page.scss'],
  standalone: false,
  providers: [Supabase]
})
export class LaudosPage implements OnInit {
  constructor(private supabase: Supabase) { }
  ngOnInit() {
    this.GetLaudos();
    this.GetPacientes();
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

  // Filtrando o paciente
  FilterPaciente(id: number) {
    const paciente = this.pacientes.find(paciente => paciente.id === id);
    const nome = paciente ? paciente.nome : null;
    return nome;
  }
}