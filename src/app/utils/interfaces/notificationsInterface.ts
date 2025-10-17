export interface Notification {
  name: String;
  url: String;
  notifcationDate: String;
  notificationTime: String;
}

export interface SignupFormModel {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
  password: string;
  userType: 'artist' | 'promoter' | 'listener' | null;
  artistType?: string;
  selectedGenres: string[];
  acceptTerms: boolean;
}
