import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdAddComponent } from './cpd-add.component';

describe('CpdAddComponent', () => {
  let component: CpdAddComponent;
  let fixture: ComponentFixture<CpdAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpdAddComponent]
    });
    fixture = TestBed.createComponent(CpdAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
