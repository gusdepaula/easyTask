import { CommonModule } from '@angular/common';
import { Component, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'ds-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  label = input.required<string>(); // Rótulo do campo (obrigatório)
  name = input.required<string>(); // Nome do campo (obrigatório)
  id = input.required<string>(); // ID do campo (obrigatório)
  type = input<'text' | 'date'>('text'); // Tipo do input (opcional, com valor padrão 'text')
  placeholder = input<string>(''); // Placeholder do campo (opcional)

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
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value); // Notifica o Angular sobre a mudança
  }
}
