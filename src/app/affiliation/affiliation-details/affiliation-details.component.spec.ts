import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationDetailsComponent } from './affiliation-details.component';

describe('AffiliationDetailsComponent', () => {
  let component: AffiliationDetailsComponent;
  let fixture: ComponentFixture<AffiliationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffiliationDetailsComponent]
    });
    fixture = TestBed.createComponent(AffiliationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
