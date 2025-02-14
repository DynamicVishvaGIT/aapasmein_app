import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllEventListPage } from './all-event-list.page';

describe('AllEventListPage', () => {
  let component: AllEventListPage;
  let fixture: ComponentFixture<AllEventListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEventListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
