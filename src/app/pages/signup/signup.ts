import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

// ✅ Standalone PrimeNG components
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';

// import { PhoneInputComponent } from '../../shared/phone-input/phone-input';
import { PhoneInputComponent } from '../../shared/phone-input/phone-input';
import { GENRE_OPTIONS } from '../../utils/constants/app.constants';
import { SignupFormModel } from '../../utils/interfaces/notificationsInterface';
import { SignupApi } from '../../services/signup-api';
import { Router } from '@angular/router';

interface CountryCode {
  label: string;
  value: string;
  flag: string;
}

function emailMatchValidator(control: AbstractControl) {
  const email = control.get('email')?.value;
  const confirm = control.get('confirmEmail')?.value;
  return email && confirm && email !== confirm ? { emailMismatch: true } : null;
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
    ReactiveFormsModule,
    PhoneInputComponent,
    MultiSelectModule,
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'], // ✅ correct key
})
export class Signup {
  signupForm!: FormGroup;
  phoneError: string = '';

  constructor(private fb: FormBuilder, private authService: SignupApi, private router: Router) {}

  selectedGenres: string[] = [];

  genreOptions = GENRE_OPTIONS;

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        userType: [null, Validators.required],
        artistType: [''],
        selectedGenres: [[]],
      },
      { validators: emailMatchValidator }
    );

    this.signupForm.get('userType')?.valueChanges.subscribe((type) => {
      const artistTypeCtrl = this.signupForm.get('artistType');
      const genreCtrl = this.signupForm.get('selectedGenres');

      if (type === 'artist' || type === 'promoter') {
        genreCtrl?.setValidators([Validators.required]);
      } else {
        genreCtrl?.clearValidators();
      }

      if (type === 'artist') {
        artistTypeCtrl?.setValidators([Validators.required]);
      } else {
        artistTypeCtrl?.clearValidators();
      }

      artistTypeCtrl?.updateValueAndValidity();
      genreCtrl?.updateValueAndValidity();
    });
  }

  isInvalid(field: string): boolean {
    const control = this.signupForm.get(field);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  onPhoneChanged(value: string): void {
    this.phoneError = value.length < 5 ? 'Please enter a valid number' : '';
    this.signupForm.patchValue({ phone: value });
  }

  onSignUp(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const formData: SignupFormModel = {
      ...this.signupForm.value,
      selectedGenres: this.signupForm.value.selectedGenres || [],
    };

    this.authService.signUp(formData).subscribe({
      next: (res) => {
        console.log('✅ Signup successful:', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Signup failed:', err);
      },
    });
  }
}
