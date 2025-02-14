import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunityChatboxPage } from './community-chatbox.page';

describe('CommunityChatboxPage', () => {
  let component: CommunityChatboxPage;
  let fixture: ComponentFixture<CommunityChatboxPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityChatboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
