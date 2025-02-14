import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvertingPage } from './adverting.page';

describe('AdvertingPage', () => {
  let component: AdvertingPage;
  let fixture: ComponentFixture<AdvertingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
