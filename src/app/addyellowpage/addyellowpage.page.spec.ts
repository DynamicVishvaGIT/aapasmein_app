import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddyellowpagePage } from './addyellowpage.page';

describe('AddyellowpagePage', () => {
  let component: AddyellowpagePage;
  let fixture: ComponentFixture<AddyellowpagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddyellowpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
