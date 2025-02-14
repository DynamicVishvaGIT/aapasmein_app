import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvantageDetailsPage } from './advantage-details.page';

describe('AdvantageDetailsPage', () => {
  let component: AdvantageDetailsPage;
  let fixture: ComponentFixture<AdvantageDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvantageDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
