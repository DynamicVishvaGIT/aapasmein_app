import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationConveniencePage } from './notification-convenience.page';

describe('NotificationConveniencePage', () => {
  let component: NotificationConveniencePage;
  let fixture: ComponentFixture<NotificationConveniencePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationConveniencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
