import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetDateSelectorComponent } from './preset-date-selector.component';

describe('PresetDateSelectorComponent', () => {
  let component: PresetDateSelectorComponent;
  let fixture: ComponentFixture<PresetDateSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresetDateSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetDateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
