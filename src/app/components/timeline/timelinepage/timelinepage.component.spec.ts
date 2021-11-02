import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinepageComponent } from './timelinepage.component';

describe('TimelinepageComponent', () => {
  let component: TimelinepageComponent;
  let fixture: ComponentFixture<TimelinepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
