import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationAddComponent } from './affiliation-add.component';

describe('AffiliationAddComponent', () => {
  let component: AffiliationAddComponent;
  let fixture: ComponentFixture<AffiliationAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffiliationAddComponent]
    });
    fixture = TestBed.createComponent(AffiliationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
