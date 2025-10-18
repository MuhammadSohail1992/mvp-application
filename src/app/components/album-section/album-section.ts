import { Component, Input } from '@angular/core';
import { SongCard } from '../song-card/song-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-section',
  standalone: true,
  imports: [CommonModule, SongCard],
  templateUrl: './album-section.html',
  styleUrl: './album-section.scss',
})
export class AlbumSection {
  @Input() sectionTitle!: string;
  @Input() subTitle!: string;
  @Input() albums: any[] = []; // ✅ initialize here (important)
}
