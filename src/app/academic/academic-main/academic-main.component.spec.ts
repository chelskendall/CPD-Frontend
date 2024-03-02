import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicMainComponent } from './academic-main.component';

describe('AcademicMainComponent', () => {
  let component: AcademicMainComponent;
  let fixture: ComponentFixture<AcademicMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicMainComponent]
    });
    fixture = TestBed.createComponent(AcademicMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
