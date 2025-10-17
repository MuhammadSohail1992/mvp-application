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
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './phone-input.html',
})
export class PhoneInputComponent {
  @Input() label: string = ''; // ✅ Add this for the label
  @Input() placeholder: string = 'Enter phone number';
  @Input() error: string = '';
  @Input() value: string = ''; // ✅ Add this for initial value
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

  ngOnInit() {
    if (this.value) {
      // Split the country code from value if needed
      const country = this.countries.find((c) => this.value.startsWith(c.code));
      if (country) {
        this.selectedCountry = country;
        this.phoneNumber = this.value.replace(country.code, '');
      } else {
        this.phoneNumber = this.value;
      }
    }
  }

  onPhoneChange(): void {
    const fullPhone = `${this.selectedCountry.code}${this.phoneNumber}`;
    this.phoneChange.emit(fullPhone);
  }
}
