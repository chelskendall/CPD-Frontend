import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicListComponent } from './academic-list.component';

describe('AcademicListComponent', () => {
  let component: AcademicListComponent;
  let fixture: ComponentFixture<AcademicListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicListComponent]
    });
    fixture = TestBed.createComponent(AcademicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
