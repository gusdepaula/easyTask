import { CommonModule } from '@angular/common';
import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ds-textarea',
  standalone: true,
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent {
  label = input.required<string>(); // Rótulo do campo (obrigatório)
  name = input.required<string>(); // Nome do campo (obrigatório)
  id = input.required<string>(); // ID do campo (obrigatório)
  placeholder = input<string>(''); // Placeholder do campo (opcional)
  rows = input<number>(5); // Número de linhas visíveis (opcional, com valor padrão 3)

  value: string = ''; // Valor do campo
  onChange = (value: string) => {};
  onTouched = () => {};

  // Métodos da interface ControlValueAccessor
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implementação opcional para desabilitar o campo
  }

  // Método chamado quando o valor do campo muda
  onInputChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement; // Corrigido para TextAreaElement
    this.value = target.value;
    this.onChange(this.value); // Notifica o Angular sobre a mudança
  }
}
