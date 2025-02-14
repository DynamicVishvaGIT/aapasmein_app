import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportReasonPage } from './report-reason.page';

describe('ReportReasonPage', () => {
  let component: ReportReasonPage;
  let fixture: ComponentFixture<ReportReasonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReasonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
