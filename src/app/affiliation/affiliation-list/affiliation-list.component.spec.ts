import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationListComponent } from './affiliation-list.component';

describe('AffiliationListComponent', () => {
  let component: AffiliationListComponent;
  let fixture: ComponentFixture<AffiliationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffiliationListComponent]
    });
    fixture = TestBed.createComponent(AffiliationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
