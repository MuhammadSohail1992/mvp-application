import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, Card, TabsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  userName = 'Muhammad';
  activeIndex: number = 0; 
  tabs: { title: string; value: number; content: string }[] = [];

  ngOnInit() {
    this.tabs = [
      { title: 'Releases', value: 0, content: 'Tab 1 Content' },
      { title: 'Videos', value: 1, content: 'Tab 2 Content' },
      { title: 'Photos', value: 2, content: 'Tab 3 Content' },
      { title: 'Events', value: 3, content: 'Tab 4 Content' },
      { title: 'Activity Wall', value: 4, content: 'Tab 5 Content' },
    ];
  }
}
