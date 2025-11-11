import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supabase } from 'src/app/services/supabase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
  providers: [Supabase]
})
export class LoginPage implements OnInit {
  constructor(private supabase: Supabase, private router: Router) { }
  ngOnInit() {}

  // Login
  public email: string = "";
  public senha: string = "";
  async Login() {
    const {error} = await this.supabase.Login(this.email, this.senha);
    if (error) {
      console.error(error);
    } else {
      this.router.navigateByUrl("/home");
    }
  }
}