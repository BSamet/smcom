import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiCircularComponent } from './kpi-circular.component';

describe('KpiCircularComponent', () => {
  let component: KpiCircularComponent;
  let fixture: ComponentFixture<KpiCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiCircularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
