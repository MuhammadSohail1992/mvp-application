import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-song-card',
  imports: [],
  templateUrl: './song-card.html',
  styleUrl: './song-card.scss',
})
export class SongCard {
  @Input() album!: {
    image: string;
    title: string;
    artist: string;
    likes: number;
    playLink: string;
  };
}
