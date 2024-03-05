import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdListComponent } from './cpd-list.component';

describe('CpdListComponent', () => {
  let component: CpdListComponent;
  let fixture: ComponentFixture<CpdListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpdListComponent]
    });
    fixture = TestBed.createComponent(CpdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
