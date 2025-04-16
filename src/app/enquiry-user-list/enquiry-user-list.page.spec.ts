import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnquiryUserListPage } from './enquiry-user-list.page';

describe('EnquiryUserListPage', () => {
  let component: EnquiryUserListPage;
  let fixture: ComponentFixture<EnquiryUserListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryUserListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
