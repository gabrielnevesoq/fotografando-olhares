import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Supabase } from 'src/app/services/supabase';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  imports: [IonicModule, CommonModule, RouterModule, FormsModule],
  providers: [Supabase]
})
export class SidemenuComponent  implements OnInit {
  constructor(private supabase: Supabase, private router: Router) { }
  async ngOnInit() {
    await this.GetUser();
    await this.GetUserData();
  }

  // Pegando o usuário
  public user_id: string = "";
  async GetUser() {
    const {data, error} = await this.supabase.GetUser();
    if (error) {
      console.error(error);
    } else {
      this.user_id = data.user.id;
      console.log(this.user_id)
    }
  }

  // Pegando dados do usuário
  public user_data: any[] = [];
  async GetUserData() {
    const {data, error} = await this.supabase.GetUserData(this.user_id);
    if (error) {
      console.error(error);
    } else {
      this.user_data = data;
    }
  }

  // LogOut
  async LogOut() {
    const {error} = await this.supabase.LogOut();
    if (error) {
      console.error(error);
    } else {
      this.router.navigateByUrl("/login");
    }
  }
}