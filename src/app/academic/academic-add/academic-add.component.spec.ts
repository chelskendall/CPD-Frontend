import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicAddComponent } from './academic-add.component';

describe('AcademicAddComponent', () => {
  let component: AcademicAddComponent;
  let fixture: ComponentFixture<AcademicAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicAddComponent]
    });
    fixture = TestBed.createComponent(AcademicAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
