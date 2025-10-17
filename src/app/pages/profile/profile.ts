import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';
import { LoginApi } from '../../services/login-api';
import { EditProfile } from '../../components/edit-profile/edit-profile';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, Card, TabsModule, EditProfile],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  user: any = null;
  userName: string = '';
  coverImage: string = '';
  defaultCover =
    'https://dqwrqt1d58pxz.cloudfront.net/images/75acb547-649a-4cd0-8ece-2d4ff34548b9.jpeg';
  activeIndex: number = 0;
  tabs: { title: string; value: number; content: string }[] = [];
  isEditOpen = false;
  private userSub!: Subscription;

  constructor(private auth: LoginApi) {}

  ngOnInit() {
    // Subscribe to user$ from LoginApi
    this.userSub = this.auth.user$.subscribe((userData) => {
      this.user = userData;
      this.updateProfileData(userData);
    });
  }

  private updateProfileData(userData: any) {
    // const userData = this.auth.getUser();
    console.log('Raw userData:', userData);
    if (userData) {
      this.user = userData;
      this.coverImage = userData.profileCoverImage || userData.coverImage || '';
      console.log('Resolved coverImage:', this.coverImage);
      // this.coverImage = userData.profileCoverImage;
      // console.log('User cover image:', userData?.profileCoverImage);
    }

    this.tabs = [
      { title: 'Releases', value: 0, content: 'Tab 1 Content' },
      { title: 'Videos', value: 1, content: 'Tab 2 Content' },
      { title: 'Photos', value: 2, content: 'Tab 3 Content' },
      { title: 'Events', value: 3, content: 'Tab 4 Content' },
      { title: 'Activity Wall', value: 4, content: 'Tab 5 Content' },
    ];
  }

  openEditProfile() {
    this.isEditOpen = true;
  }
}
