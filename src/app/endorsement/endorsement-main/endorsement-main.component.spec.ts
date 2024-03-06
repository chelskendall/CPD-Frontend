import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorsementMainComponent } from './endorsement-main.component';

describe('EndorsementMainComponent', () => {
  let component: EndorsementMainComponent;
  let fixture: ComponentFixture<EndorsementMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndorsementMainComponent]
    });
    fixture = TestBed.createComponent(EndorsementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
