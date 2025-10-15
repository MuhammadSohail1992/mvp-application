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
  userFirstName: string = 'Muhammad';
  userType: string = 'Music Lover';

  constructor(private auth: LoginApi) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    console.log(this.user);
  }

  logout() {
    this.auth.logout();
  }

  consoleLog() {
    
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

  profileItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        // Navigate to profile
      },
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => {
        // Navigate to settings
      },
    },
    {
      separator: true,
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        // Logout logic
      },
    },
  ];
}
