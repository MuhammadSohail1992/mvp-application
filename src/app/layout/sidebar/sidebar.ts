import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu'; // ✅ Import this

@Component({
  selector: 'app-sidebar',
  imports: [PanelMenuModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  menuItems: MenuItem[] = [
    {
      label: 'Discover',
      icon: 'pi pi-home',
      routerLink: ['/discover'],
    },
    {
      label: 'Stores',
      icon: 'pi pi-shopping-bag',
      items: [
        { label: 'Music', icon: 'pi pi-music', routerLink: ['/stores/music'] },
        { label: 'Merchandise', icon: 'pi pi-briefcase', routerLink: ['/stores/merchandise'] },
        { label: 'Equipment', icon: 'pi pi-cog', routerLink: ['/stores/equipment'] },
      ],
    },
    {
      label: 'Promotional Music',
      icon: 'pi pi-volume-up',
      routerLink: ['/promotional-music'],
    },
    {
      label: 'Radio',
      icon: 'pi pi-broadcast-tower',
      routerLink: ['/radio'],
    },
    {
      label: 'Videos',
      icon: 'pi pi-video',
      routerLink: ['/videos'],
    },
    {
      label: 'Photos',
      icon: 'pi pi-image',
      routerLink: ['/photos'],
    },
    {
      label: 'Audio Services',
      icon: 'pi pi-headphones',
      items: [
        { label: 'Mixing', icon: 'pi pi-sliders-h' },
        { label: 'Mastering', icon: 'pi pi-volume-up' },
      ],
    },
    {
      label: 'Artists',
      icon: 'pi pi-users',
      items: [
        { label: 'Profiles', icon: 'pi pi-id-card' },
        { label: 'Releases', icon: 'pi pi-music' },
      ],
    },
    {
      label: 'Promoters',
      icon: 'pi pi-megaphone',
      items: [
        { label: 'Campaigns', icon: 'pi pi-bullhorn' },
        { label: 'Partners', icon: 'pi pi-users' },
      ],
    },
    {
      label: 'Events',
      icon: 'pi pi-calendar',
      routerLink: ['/events'],
    },
  ];
}
