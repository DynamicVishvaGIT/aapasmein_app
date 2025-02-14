import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcceptRequestPage } from './accept-request.page';

describe('AcceptRequestPage', () => {
  let component: AcceptRequestPage;
  let fixture: ComponentFixture<AcceptRequestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
