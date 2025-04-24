import { TestBed } from '@angular/core/testing';

import { CareerSuggestionsService } from './career-suggestions.service';

describe('CareerSuggestionsService', () => {
  let service: CareerSuggestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareerSuggestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
