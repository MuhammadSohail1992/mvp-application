import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { MultiSelect } from 'primeng/multiselect';
import { DatePicker } from 'primeng/datepicker';
import { Editor } from 'primeng/editor';
import { PhoneInputComponent } from '../../shared/phone-input/phone-input';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FloatLabel,
    InputText,
    Select,
    MultiSelect,
    DatePicker,
    Editor,
    PhoneInputComponent
  ],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss',
})
export class EditProfile implements OnInit {
  @Input() user: any;
  @Output() close = new EventEmitter<void>();

  isClosing: boolean = false;

  // Contact Info
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  artistName: string = '';
  dateOfBirth: Date | null = null;
  gender: string = '';

  // Music Preferences
  selectedGenres: string[] = [];
  artistType: string = '';
  influencedBy: string = '';
  profileIntro: string = '';

  // Address Info
  country: string = '';
  state: string = '';
  city: string = '';
  street: string = '';
  zipCode: string = '';
  poBox: string = '';

  // Dropdown Options
  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  genreOptions = [
    { label: 'Bluegrass', value: 'Bluegrass' },
    { label: 'Dance Music', value: 'Dance Music' },
    { label: 'Rock', value: 'Rock' },
    { label: 'Pop', value: 'Pop' },
    { label: 'Jazz', value: 'Jazz' },
    { label: 'Classical', value: 'Classical' },
    { label: 'Hip Hop', value: 'Hip Hop' },
    { label: 'Electronic', value: 'Electronic' },
  ];
  artistTypeOptions = [
    { label: 'Band', value: 'Band' },
    { label: 'Solo Artist', value: 'Solo' },
    { label: 'DJ', value: 'DJ' },
    { label: 'Producer', value: 'Producer' },
  ];

  countryOptions = [
    { label: 'Pakistan', value: 'Pakistan' },
    { label: 'United States', value: 'United States' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'Canada', value: 'Canada' },
  ];

  stateOptions = [
    { label: 'Punjab', value: 'Punjab' },
    { label: 'Sindh', value: 'Sindh' },
    { label: 'KPK', value: 'KPK' },
    { label: 'Balochistan', value: 'Balochistan' },
  ];

  cityOptions = [{ label: 'Select City', value: '' }];

  ngOnInit() {
    console.log('User received in edit profile:', this.user);

    if (this.user) {
      // Populate Contact Info
      this.firstName = this.user.firstName || '';
      this.lastName = this.user.lastName || '';
      this.email = this.user.email || '';
      this.phoneNumber = this.user.phone || '';
      this.artistName = this.user.artistName || '';

      // Fix: user object has 'dob' not 'dateOfBirth'
      this.dateOfBirth = this.user.dob ? new Date(this.user.dob) : null;

      // Fix: gender is lowercase in user object
      this.gender = this.user.gender ? this.capitalizeFirst(this.user.gender) : '';

      // Populate Music Preferences - map to value-only array
      this.selectedGenres = this.user.musicSpecialization || [];
      this.artistType = this.user.artistType || '';
      this.influencedBy = this.user.influencedBy || '';
      this.profileIntro = this.user.profileIntro || '';

      // Populate Address Info
      this.country = this.user.country || '';
      this.state = this.user.state || '';
      this.city = this.user.city || '';
      this.street = this.user.street || '';
      this.zipCode = this.user.zipCode || '';
      this.poBox = this.user.pobox || '';

      console.log('Form populated with:', {
        firstName: this.firstName,
        dateOfBirth: this.dateOfBirth,
        gender: this.gender,
        genres: this.selectedGenres,
        artistType: this.artistType,
      });
    }
  }

  // Helper method to capitalize first letter
  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  onCountryChange() {
    // Load states based on selected country
    console.log('Country changed to:', this.country);
    // TODO: Fetch states from API based on country
  }

  saveProfile() {
    const updatedProfile = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phoneNumber,
      artistName: this.artistName,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      musicSpecialization: this.selectedGenres,
      artistType: this.artistType,
      influencedBy: this.influencedBy,
      profileIntro: this.profileIntro,
      country_id: this.country,
      state_id: this.state,
      city: this.city,
      street: this.street,
      zipCode: this.zipCode,
      pobox: this.poBox,
    };

    console.log('Saving profile...', updatedProfile);

    // TODO: Call your API service to update the profile
    // this.profileService.updateProfile(this.user._id, updatedProfile).subscribe(...)

    this.closeModal();
  }

  closeModal() {
    this.isClosing = true;
    setTimeout(() => {
      this.close.emit();
    }, 300); // Match animation duration
  }
}
