import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
// import { Dropdown } from 'primeng/themes/dropdown';

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
    Button,
    // Dropdown,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class Signup {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  confirmEmail: string = '';
  phone: string = '';
  password: string = '';
  userType: string = 'artist';
  countryCode: string = '+1';

  countryCodes = [
    { label: 'United States (+1)', value: '+1', flag: '🇺🇸' },
    { label: 'United Kingdom (+44)', value: '+44', flag: '🇬🇧' },
    { label: 'Pakistan (+92)', value: '+92', flag: '🇵🇰' },
    { label: 'India (+91)', value: '+91', flag: '🇮🇳' },
    { label: 'Canada (+1)', value: '+1', flag: '🇨🇦' },
  ];

  onSignUp() {
    console.log('Sign up with:', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      confirmEmail: this.confirmEmail,
      phone: this.phone,
      password: this.password,
      userType: this.userType,
      countryCode: this.countryCode,
    });
    // Add your signup logic here
  }
}
