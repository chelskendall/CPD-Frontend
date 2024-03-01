import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalMainComponent } from './personal-main.component';

describe('PersonalMainComponent', () => {
  let component: PersonalMainComponent;
  let fixture: ComponentFixture<PersonalMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalMainComponent]
    });
    fixture = TestBed.createComponent(PersonalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
