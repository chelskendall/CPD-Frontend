import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdMainComponent } from './cpd-main.component';

describe('CpdMainComponent', () => {
  let component: CpdMainComponent;
  let fixture: ComponentFixture<CpdMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpdMainComponent]
    });
    fixture = TestBed.createComponent(CpdMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
