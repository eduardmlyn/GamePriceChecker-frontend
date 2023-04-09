import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceLineChartComponent } from './price-line-chart.component';

describe('PriceGraphComponent', () => {
  let component: PriceLineChartComponent;
  let fixture: ComponentFixture<PriceLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
