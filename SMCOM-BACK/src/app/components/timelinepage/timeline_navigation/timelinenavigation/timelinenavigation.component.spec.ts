import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinenavigationComponent } from './timelinenavigation.component';

describe('TimelinenavigationComponent', () => {
  let component: TimelinenavigationComponent;
  let fixture: ComponentFixture<TimelinenavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinenavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinenavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
