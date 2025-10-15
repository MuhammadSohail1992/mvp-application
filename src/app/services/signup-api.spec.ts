import { TestBed } from '@angular/core/testing';

import { SignupApi } from './signup-api';

describe('SignupApi', () => {
  let service: SignupApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
