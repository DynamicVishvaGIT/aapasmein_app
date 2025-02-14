import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterModalPage } from './footer-modal.page';

describe('FooterModalPage', () => {
  let component: FooterModalPage;
  let fixture: ComponentFixture<FooterModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
