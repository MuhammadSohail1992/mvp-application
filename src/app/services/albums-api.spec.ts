import { TestBed } from '@angular/core/testing';

import { AlbumsApi } from './albums-api';

describe('AlbumsApi', () => {
  let service: AlbumsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
