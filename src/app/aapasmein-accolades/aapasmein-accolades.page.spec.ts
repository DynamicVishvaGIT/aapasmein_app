import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AapasmeinAccoladesPage } from './aapasmein-accolades.page';

describe('AapasmeinAccoladesPage', () => {
  let component: AapasmeinAccoladesPage;
  let fixture: ComponentFixture<AapasmeinAccoladesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AapasmeinAccoladesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
