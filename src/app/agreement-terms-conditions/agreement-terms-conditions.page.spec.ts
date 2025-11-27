import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgreementTermsConditionsPage } from './agreement-terms-conditions.page';

describe('AgreementTermsConditionsPage', () => {
  let component: AgreementTermsConditionsPage;
  let fixture: ComponentFixture<AgreementTermsConditionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementTermsConditionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
