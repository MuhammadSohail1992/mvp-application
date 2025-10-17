import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { Subscription } from 'rxjs';
import { LoginApi } from '../../services/login-api';

@Component({
  selector: 'app-header',
  imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, CommonModule, Menu],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class Header implements OnInit, OnDestroy {
  user: any = null;
  userFirstName: string = '';
  userType: string = '';
  profileImageSrc: string = '';
  profileItems: MenuItem[] = [];
  private userSub!: Subscription;

  // Default placeholder image
  private readonly defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; 

  constructor(private auth: LoginApi) {}

  ngOnInit() {
    // Subscribe to user$ from LoginApi
    this.userSub = this.auth.user$.subscribe((userData) => {
      this.user = userData;
      this.updateHeaderData(userData);
    });
  }

  private updateHeaderData(userData: any) {
    if (userData) {
      const formattedName = `${userData.firstName}-${userData.lastName}`.replace(/\s+/g, '-');

      if (userData?.isArtist) {
        this.userType = 'Artist';
      } else if (userData?.isPromoter) {
        this.userType = 'Promoter';
      } else {
        this.userType = 'Music Lover';
      }

      this.userFirstName = userData?.firstName || '';
      // ✅ Set profile image or default avatar
      this.profileImageSrc = userData?.profileImage || this.defaultAvatar;

      this.profileItems = [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          routerLink: ['/profile/me/releases'],
          queryParams: { name: formattedName },
        },
        { label: 'Promotion', routerLink: '/promotion' },
        { label: 'Site Pricing', routerLink: '/pricing' },
        { separator: true },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => this.logout(),
        },
      ];
    } else {
      // ✅ Not logged in — show default avatar
      this.profileItems = [
        { label: 'Login', routerLink: '/login' },
        { label: 'Promotion', routerLink: '/promotion' },
        { label: 'Site Pricing', routerLink: '/pricing' },
      ];
      this.userFirstName = '';
      this.profileImageSrc = this.defaultAvatar;
      this.userType = '';
    }
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
  }

  notificationItems: MenuItem[] = [
    {
      label: 'New comment on your post',
      url: '/',
      notifcationDate: '24/3/2025',
      notificationTime: '10:30 PM',
    },
    { label: 'New follower', url: '/', notifcationDate: '24/3/2025', notificationTime: '10:30 PM' },
    {
      label: 'Server downtime alert',
      url: '/',
      notifcationDate: '24/3/2025',
      notificationTime: '10:30 PM',
    },
  ];
}
