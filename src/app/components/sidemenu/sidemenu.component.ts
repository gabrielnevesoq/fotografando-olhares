import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
  constructor() { }
  ngOnInit() {}
}