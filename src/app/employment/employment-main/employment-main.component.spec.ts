import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentMainComponent } from './employment-main.component';

describe('EmploymentMainComponent', () => {
  let component: EmploymentMainComponent;
  let fixture: ComponentFixture<EmploymentMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmploymentMainComponent]
    });
    fixture = TestBed.createComponent(EmploymentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
