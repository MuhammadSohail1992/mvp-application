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
import { ProfileService } from '../../services/profile-service';

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
    PhoneInputComponent,
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
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
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

  cityOptions = [
    { label: 'Karachi', value: 'Karachi' },
    { label: 'Lahore', value: 'Lahore' },
    { label: 'Islamabad', value: 'Islamabad' },
    { label: 'Rawalpindi', value: 'Rawalpindi' },
    { label: 'Peshawar', value: 'Peshawar' },
    { label: 'Quetta', value: 'Quetta' },
  ];

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    // console.log('User received in edit profile:', this.user);
    // this.populateForm(this.user);
    this.profileService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.populateForm(user);
      }
    });
  }

  private populateForm(user: any) {
    if (user) {
      this.firstName = user.firstName || '';
      this.lastName = user.lastName || '';
      this.email = user.email || '';
      this.phoneNumber = user.phone || '';
      this.artistName = user.artistName || '';
      this.dateOfBirth = user.dob ? new Date(user.dob) : null;
      this.gender = user.gender || '';
      this.selectedGenres = user.musicSpecialization || [];
      this.artistType = user.artistType || '';
      this.influencedBy = user.influencedBy || '';
      this.profileIntro = user.profileIntro || '';
      this.country = user.country || '';
      this.state = user.state || '';
      this.city = user.city || '';
      this.street = user.street || '';
      this.zipCode = user.zipCode || '';
      this.poBox = user.pobox || '';
    }
  }

  onCountryChange() {
    console.log('Country changed to:', this.country);
  }

  saveProfile() {
    const updatedProfile = {
      firstName: this.firstName,
      lastName: this.lastName,
      artistName: this.artistName,
      email: this.email,
      phone: this.phoneNumber,
      dob: this.dateOfBirth,
      city: this.city,
      country: this.country,
      state: this.state,
      street: this.street,
      zipCode: this.zipCode,
      pobox: this.poBox,
      influencedBy: this.influencedBy,
      gender: this.gender,
      profileIntro: this.profileIntro,
      musicSpecialization: this.selectedGenres,
      artistType: this.artistType,
    };

    console.log('Saving profile...', updatedProfile);

    this.profileService.updateProfile(updatedProfile).subscribe({
      next: (freshUser: any) => {
        console.log('Profile updated and refreshed:', freshUser);
        this.profileService.updateUserLocally(freshUser);
      },
      // next: (freshUser: any) => {
      //   console.log('Profile updated and refreshed:', freshUser);

      //   // ✅ Update global user state here after backend confirms
      //   this.profileService.updateUserLocally(freshUser);
      //   // this.auth.updateUserProfile(freshUser);

      //   // Update form & UI
      //   this.user = freshUser;
      //   this.populateForm(freshUser);
      //   this.closeModal();
      // },
      error: (err: any) => {
        console.error('Error updating profile:', err);
      },
    });

    // this.profileService.updateProfile(updatedProfile).subscribe({
    //   next: (freshUser: any) => {
    //     console.log('Profile updated and refreshed:', freshUser);
    //     this.user = freshUser;
    //     this.populateForm(freshUser);
    //     this.closeModal();
    //   },
    //   error: (err: any) => {
    //     console.error('Error updating profile:', err);
    //   },
    // });
  }

  onPhoneReceived(phone: string) {
    console.log('Phone received:', phone);
    this.phoneNumber = phone;
  }

  closeModal() {
    this.isClosing = true;
    setTimeout(() => {
      this.close.emit();
    }, 300);
  }
}
