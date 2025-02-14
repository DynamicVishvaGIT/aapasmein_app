import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestSendPage } from './request-send.page';

describe('RequestSendPage', () => {
  let component: RequestSendPage;
  let fixture: ComponentFixture<RequestSendPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
