import { TestBed } from '@angular/core/testing';

import { RickandmortyserviceService } from './rickandmortyservice.service';

describe('RickandmortyserviceService', () => {
  let service: RickandmortyserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickandmortyserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
