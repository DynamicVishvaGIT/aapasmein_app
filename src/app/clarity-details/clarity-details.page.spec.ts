import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityDetailsPage } from './clarity-details.page';

describe('ClarityDetailsPage', () => {
  let component: ClarityDetailsPage;
  let fixture: ComponentFixture<ClarityDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClarityDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
