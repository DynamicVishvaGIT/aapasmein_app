import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRateRewardsPage } from './add-rate-rewards.page';

describe('AddRateRewardsPage', () => {
  let component: AddRateRewardsPage;
  let fixture: ComponentFixture<AddRateRewardsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRateRewardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
