import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdDetailsComponent } from './cpd-details.component';

describe('CpdDetailsComponent', () => {
  let component: CpdDetailsComponent;
  let fixture: ComponentFixture<CpdDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpdDetailsComponent]
    });
    fixture = TestBed.createComponent(CpdDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
