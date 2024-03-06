import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorsementListComponent } from './endorsement-list.component';

describe('EndorsementListComponent', () => {
  let component: EndorsementListComponent;
  let fixture: ComponentFixture<EndorsementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndorsementListComponent]
    });
    fixture = TestBed.createComponent(EndorsementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
