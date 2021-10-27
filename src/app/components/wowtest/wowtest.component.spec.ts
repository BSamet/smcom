import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowtestComponent } from './wowtest.component';

describe('WowtestComponent', () => {
  let component: WowtestComponent;
  let fixture: ComponentFixture<WowtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WowtestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WowtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
