import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationMainComponent } from './affiliation-main.component';

describe('AffiliationMainComponent', () => {
  let component: AffiliationMainComponent;
  let fixture: ComponentFixture<AffiliationMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffiliationMainComponent]
    });
    fixture = TestBed.createComponent(AffiliationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
