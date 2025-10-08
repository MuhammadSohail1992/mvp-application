import { Component } from '@angular/core';
import { SongCard } from '../song-card/song-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-section',
  imports: [CommonModule, SongCard],
  templateUrl: './album-section.html',
  styleUrl: './album-section.scss',
})
export class AlbumSection {
  albums = [
    {
      image: 'https://dqwrqt1d58pxz.cloudfront.net/images/1711567894428218.jpg',
      title: 'Album from App',
      artist: 'Muhammad Usman',
      likes: 0,
      playLink: '/play/1',
    },
    {
      image: 'https://dqwrqt1d58pxz.cloudfront.net/images/1700821110769277.jpg',
      title: 'Summer Beats',
      artist: 'Ali Khan',
      likes: 24,
      playLink: '/play/2',
    },
    {
      image: 'https://dqwrqt1d58pxz.cloudfront.net/images/1711567894428218.jpg',
      title: 'Album from App',
      artist: 'Muhammad Usman',
      likes: 0,
      playLink: '/play/1',
    },
    {
      image: 'https://dqwrqt1d58pxz.cloudfront.net/images/1700821110769277.jpg',
      title: 'Summer Beats',
      artist: 'Ali Khan',
      likes: 24,
      playLink: '/play/2',
    },
    {
      image: 'https://dqwrqt1d58pxz.cloudfront.net/images/1711567894428218.jpg',
      title: 'Album from App',
      artist: 'Muhammad Usman',
      likes: 0,
      playLink: '/play/1',
    },
    {
      image: 'https://dqwrqt1d58pxz.cloudfront.net/images/1700821110769277.jpg',
      title: 'Summer Beats',
      artist: 'Ali Khan',
      likes: 24,
      playLink: '/play/2',
    },
  ];
}
