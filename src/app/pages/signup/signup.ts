import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// ✅ Standalone PrimeNG components
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';

// import { PhoneInputComponent } from '../../shared/phone-input/phone-input';
import { PhoneInputComponent } from '../../shared/phone-input/phone-input';

interface CountryCode {
  label: string;
  value: string;
  flag: string;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FloatLabel,
    InputText,
    Password,
    // Button,
    PhoneInputComponent,
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'], // ✅ correct key
})
export class Signup {
  // 🧩 Form fields
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  confirmEmail: string = '';
  phone: string = '';
  password: string = '';
  userType: 'artist' | 'promoter' | 'listener' = 'artist';
  countryCode: string = '+1';

  // 🌍 Country list (typed)
  countryCodes: CountryCode[] = [
    { label: 'United States (+1)', value: '+1', flag: '🇺🇸' },
    { label: 'United Kingdom (+44)', value: '+44', flag: '🇬🇧' },
    { label: 'Pakistan (+92)', value: '+92', flag: '🇵🇰' },
    { label: 'India (+91)', value: '+91', flag: '🇮🇳' },
    { label: 'Canada (+1)', value: '+1', flag: '🇨🇦' },
  ];

  phoneError: string = '';

  // ✅ Typed method
  onPhoneChanged(value: string): void {
    console.log('Full phone number:', value);
    this.phoneError = value.length < 5 ? 'Please enter a valid number' : '';
  }

  // ✅ Typed signup handler
  onSignUp(): void {
    const signupData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      confirmEmail: this.confirmEmail,
      phone: this.phone,
      password: this.password,
      userType: this.userType,
      countryCode: this.countryCode,
    };

    console.log('Sign up with:', signupData);
    // TODO: Add your signup logic here
  }
}
