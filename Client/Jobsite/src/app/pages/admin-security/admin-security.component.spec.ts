import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSecurityComponent } from './admin-security.component';

describe('AdminSecurityComponent', () => {
  let component: AdminSecurityComponent;
  let fixture: ComponentFixture<AdminSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSecurityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
