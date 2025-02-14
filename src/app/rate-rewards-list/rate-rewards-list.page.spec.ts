import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RateRewardsListPage } from './rate-rewards-list.page';

describe('RateRewardsListPage', () => {
  let component: RateRewardsListPage;
  let fixture: ComponentFixture<RateRewardsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RateRewardsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
