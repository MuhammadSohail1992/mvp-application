import { Component, input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Card } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-profile',
  imports: [Card, TabsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  userName = "Muhammad"
  verticalTabs: MenuItem[] = [
    { label: 'Releases', icon: 'pi pi-folder' },
    { label: 'Videos', icon: 'pi pi-video' },
    { label: 'Photos', icon: 'pi pi-image' },
    { label: 'Events', icon: 'pi pi-calendar' },
    { label: 'Activity Wall', icon: 'pi pi-comments' },
  ];

  // Active vertical tab
  activeVertical: MenuItem = this.verticalTabs[0];

  // Horizontal TabView index
  activeTabIndex: number = 0;
}
