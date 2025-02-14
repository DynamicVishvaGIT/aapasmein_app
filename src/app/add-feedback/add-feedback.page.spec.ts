import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFeedbackPage } from './add-feedback.page';

describe('AddFeedbackPage', () => {
  let component: AddFeedbackPage;
  let fixture: ComponentFixture<AddFeedbackPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
