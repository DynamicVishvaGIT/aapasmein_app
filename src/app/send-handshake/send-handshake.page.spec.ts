import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendHandshakePage } from './send-handshake.page';

describe('SendHandshakePage', () => {
  let component: SendHandshakePage;
  let fixture: ComponentFixture<SendHandshakePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SendHandshakePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
