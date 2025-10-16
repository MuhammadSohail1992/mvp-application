import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { LoginApi } from '../../services/login-api';
import { Notification } from '../../utils/interfaces/notificationsInterface';

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
export class Header {
  user: any = null;
  userFirstName: string = '';
  userType: string = '';
  profileImageSrc: string = '';
  profileItems: MenuItem[] = [];

  constructor(private auth: LoginApi) {}

  ngOnInit() {
    const userData = this.auth.getUser();
    console.log(userData);
    this.user = userData;
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
      this.profileImageSrc = userData?.profileImage || '';
      this.profileItems = [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          routerLink: ['/profile/me/releases'],
          queryParams: { name: formattedName },
        },
        { label: 'Promotion', routerLink: '/promotion' },
        { label: 'Site Pricing', routerLink: '/pricing' },
        {
          separator: true,
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {},
        },
      ];
    } else {
      this.profileItems = [
        { label: 'Login', routerLink: '/login' },
        { label: 'Promotion', routerLink: '/promotion' },
        { label: 'Site Pricing', routerLink: '/pricing' },
      ];
    }
  }

  logout() {
    this.auth.logout();
  }

  // get profileLink(): string {
  //   if (!this.user) return '/login';

  //   const nameParam = `${this.user.firstName || ''}-${this.user.lastName || ''}`
  //     .trim()
  //     .replace(/\s+/g, '-'); // replace spaces with dashes

  //   return `/profile/me/releases?name=${nameParam}`;
  // }

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
