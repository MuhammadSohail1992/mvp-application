// import { Component } from '@angular/core';
// import { AlbumSection } from '../../components/album-section/album-section';

// @Component({
//   selector: 'app-discover',
//   imports: [AlbumSection],
//   templateUrl: './discover.html',
//   styleUrl: './discover.scss'
// })
// export class Discover {

// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumSection } from '../../components/album-section/album-section';
import { AlbumsApi } from '../../services/albums-api';

// @Component({
//   selector: 'app-discover',
//   standalone: true,
//   imports: [CommonModule, AlbumSection],
//   templateUrl: './discover.html',
//   styleUrls: ['./discover.scss'],
// })
// export class Discover implements OnInit {
//   albums: any[] = [];

//   constructor(private albumService: AlbumsApi) {}

//   ngOnInit(): void {
//     this.albums = [
//       { title: 'Trending Singles', endpoint: 'single/trending', data: [] },
//       { title: 'Trending Albums & EPs', endpoint: 'album/trending', data: [] },
//       { title: 'Latest Singles', endpoint: 'single/latest', data: [] },
//       { title: 'Latest Albums & EPs', endpoint: 'album/latest', data: [] },
//     ];

//     this.fetchAlbums();
//   }

//   fetchAlbums(): void {
//     this.albums.forEach((album) => {
//       this.albumService.getAlbumsByType(album.endpoint).subscribe({
//         next: (res: any) => {
//           album.data = res?.data?.items || res?.data || [];
//         },
//         error: (err) => console.error(`Error fetching ${album.title}`, err),
//       });
//     });
//   }
// }


@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule, AlbumSection],
  templateUrl: './discover.html',
  styleUrls: ['./discover.scss'],
})
export class Discover implements OnInit {
  discoverSections: any[] = [];

  constructor(private albumService: AlbumsApi) {}

  ngOnInit(): void {
    this.discoverSections = [
      {
        sectionTitle: 'Trending',
        subsections: [
          { subTitle: 'Singles', endpoint: 'single/trending', data: [] },
          { subTitle: "Albums & EP's", endpoint: 'album/trending', data: [] },
        ],
      },
      {
        sectionTitle: 'Latest',
        subsections: [
          { subTitle: 'Singles', endpoint: 'single/latest', data: [] },
          { subTitle: "Albums & EP's", endpoint: 'album/latest', data: [] },
        ],
      },
    ];

    // this.loadAllData();
  }

  loadAllData(): void {
    this.discoverSections.forEach((section) => {
      section.subsections.forEach((sub: any) => {
        this.albumService.getAlbumsByType(sub.endpoint).subscribe({
          next: (res: any) => {
            sub.data = res?.data?.items || res?.data || [];
          },
          error: (err) => console.error(`Error fetching ${sub.endpoint}`, err),
        });
      });
    });
  }
}
