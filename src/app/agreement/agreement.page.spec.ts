import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgreementPage } from './agreement.page';

describe('AgreementPage', () => {
  let component: AgreementPage;
  let fixture: ComponentFixture<AgreementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
