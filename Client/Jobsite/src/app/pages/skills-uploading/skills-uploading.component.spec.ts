import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsUploadingComponent } from './skills-uploading.component';

describe('SkillsUploadingComponent', () => {
  let component: SkillsUploadingComponent;
  let fixture: ComponentFixture<SkillsUploadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsUploadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsUploadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
