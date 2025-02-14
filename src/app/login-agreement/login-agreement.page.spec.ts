import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginAgreementPage } from './login-agreement.page';

describe('LoginAgreementPage', () => {
  let component: LoginAgreementPage;
  let fixture: ComponentFixture<LoginAgreementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAgreementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
