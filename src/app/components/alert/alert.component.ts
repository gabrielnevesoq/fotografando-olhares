import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  animations: [
    trigger('fadeScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('250ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ],
})
export class AlertComponent  implements OnInit {
  constructor(private modalController: ModalController) {}
  ngOnInit() {}

  // Variáveis vindas do pai
  @Input() titulo: string = 'Atenção';
  @Input() mensagem: string = '';
  @Input() tipo: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() botaoCancelar: boolean = false;
  @Input() textoConfirmar: string = 'OK';
  @Input() textoCancelar: string = 'Cancelar';

  getIcon() {
    const icons = {
      success: 'checkmark-circle',
      error: 'close-circle',
      warning: 'alert-circle',
      info: 'information-circle'
    };
    return icons[this.tipo];
  }

  confirmar() {
    this.modalController.dismiss({ confirmado: true });
  }

  cancelar() {
    this.modalController.dismiss({ confirmado: false });
  }

  fecharBackdrop(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('alerta-overlay')) {
      this.cancelar();
    }
  }
}