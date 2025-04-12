import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCheckComponent } from './ai-check.component';

describe('AiCheckComponent', () => {
  let component: AiCheckComponent;
  let fixture: ComponentFixture<AiCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
