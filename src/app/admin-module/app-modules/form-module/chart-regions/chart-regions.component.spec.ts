import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRegionsComponent } from './chart-regions.component';

describe('ChartRegionsComponent', () => {
  let component: ChartRegionsComponent;
  let fixture: ComponentFixture<ChartRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
