import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlbumsApi {
  private baseUrl = 'https://api.totalindie.com/api/v1/store/music';

  constructor(private http: HttpClient) {}

  getMusicList(
    type: 'single' | 'album',
    category: 'trending' | 'latest',
    page = 0,
    perPage = 6,
    filters: any = {}
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('keyword', filters.keyword || '')
      .set('perPage', perPage)
      .set('genres', filters.genres || '')
      .set('subGenres', filters.subGenres || '')
      .set('artist', filters.artist || '')
      .set('trending', filters.trending ?? 'false');

    return this.http.get(`${this.baseUrl}/${type}/${category}`, { params });
  }

  getAlbumsByType(endpoint: string, page = 0, perPage = 6): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}?page=${page}&keyword=&perPage=${perPage}&genres=&subGenres=&artist=&trending=false`;
    return this.http.get(url);
  }
}
