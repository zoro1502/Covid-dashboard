import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRegionComponent } from './chart-region.component';

describe('ChartRegionComponent', () => {
  let component: ChartRegionComponent;
  let fixture: ComponentFixture<ChartRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartRegionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
