import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorsementAddComponent } from './endorsement-add.component';

describe('EndorsementAddComponent', () => {
  let component: EndorsementAddComponent;
  let fixture: ComponentFixture<EndorsementAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndorsementAddComponent]
    });
    fixture = TestBed.createComponent(EndorsementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
