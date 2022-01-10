import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecheckerComponent } from './servicechecker.component';

describe('ServicecheckerComponent', () => {
  let component: ServicecheckerComponent;
  let fixture: ComponentFixture<ServicecheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicecheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicecheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
