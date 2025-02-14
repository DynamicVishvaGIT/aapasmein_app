import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalsearchPage } from './globalsearch.page';

describe('GlobalsearchPage', () => {
  let component: GlobalsearchPage;
  let fixture: ComponentFixture<GlobalsearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalsearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
