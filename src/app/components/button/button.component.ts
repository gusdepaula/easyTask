import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'ds-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  imports: [CommonModule],
})
export class ButtonComponent {
  label = input.required<string>(); // Texto do botão (obrigatório)
  type = input<'button' | 'submit' | 'reset'>('button'); // Tipo do botão (opcional, com valor padrão)
  disabled = input<boolean>(false); // Estado desabilitado (opcional, com valor padrão)
  class = input<string>(''); // Classes CSS adicionais (opcional)
  routerLink = input<string | undefined>(); // Rota para navegação (opcional)
}
