import { TestBed } from '@angular/core/testing';

import { ProfissionalScheduleService } from './profissional-schedule.service';

describe('ProfissionalScheduleService', () => {
  let service: ProfissionalScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfissionalScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
