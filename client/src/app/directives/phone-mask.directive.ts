import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {
  private previousValue: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    }

    input.value = value;
    this.previousValue = value;
  }
}
