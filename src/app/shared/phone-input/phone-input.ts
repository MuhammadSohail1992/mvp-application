import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Country {
  name: string;
  code: string;
  flag: string;
}

@Component({
  selector: 'app-phone-input',
  standalone: true, // ✅ must be present
  imports: [CommonModule, FormsModule],
  templateUrl: './phone-input.html', // ✅ ensure this file exists
})
export class PhoneInputComponent {
  @Input() placeholder: string = 'Enter phone number';
  @Input() error: string = '';
  @Output() phoneChange = new EventEmitter<string>();

  countries: Country[] = [
    { name: 'United States', code: '+1', flag: '🇺🇸' },
    { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
    { name: 'Australia', code: '+61', flag: '🇦🇺' },
  ];

  selectedCountry: Country = this.countries[0];
  phoneNumber: string = '';

  onPhoneChange(): void {
    const fullPhone = `${this.selectedCountry.code}${this.phoneNumber}`;
    this.phoneChange.emit(fullPhone);
  }
}
