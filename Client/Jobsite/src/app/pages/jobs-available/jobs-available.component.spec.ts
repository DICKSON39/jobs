import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsAvailableComponent } from './jobs-available.component';

describe('JobsAvailableComponent', () => {
  let component: JobsAvailableComponent;
  let fixture: ComponentFixture<JobsAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsAvailableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
