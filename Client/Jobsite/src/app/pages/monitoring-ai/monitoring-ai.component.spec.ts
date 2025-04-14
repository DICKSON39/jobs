import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringAiComponent } from './monitoring-ai.component';

describe('MonitoringAiComponent', () => {
  let component: MonitoringAiComponent;
  let fixture: ComponentFixture<MonitoringAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringAiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
