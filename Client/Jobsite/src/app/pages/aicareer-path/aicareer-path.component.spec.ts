import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AICareerPathComponent } from './aicareer-path.component';

describe('AICareerPathComponent', () => {
  let component: AICareerPathComponent;
  let fixture: ComponentFixture<AICareerPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AICareerPathComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AICareerPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
