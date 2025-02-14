import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioValuationPage } from './portfolio-valuation.page';

describe('PortfolioValuationPage', () => {
  let component: PortfolioValuationPage;
  let fixture: ComponentFixture<PortfolioValuationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioValuationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
