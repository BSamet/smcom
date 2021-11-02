import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpistandardComponent } from './kpistandard.component';

describe('KpistandardComponent', () => {
  let component: KpistandardComponent;
  let fixture: ComponentFixture<KpistandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpistandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpistandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
