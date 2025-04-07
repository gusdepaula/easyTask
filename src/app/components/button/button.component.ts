import { Component, Input } from '@angular/core';

@Component({
  selector: 'ds-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label: string = ''; // Texto do botão
  @Input() type: 'button' | 'submit' | 'reset' = 'button'; // Tipo do botão
  @Input() disabled: boolean = false; // Estado desabilitado
  @Input() class: string = ''; // Classes CSS adicionais
}
