import { TestBed } from '@angular/core/testing';

import { JobSkillService } from './job-skill.service';

describe('JobSkillService', () => {
  let service: JobSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
