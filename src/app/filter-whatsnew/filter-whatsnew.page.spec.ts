import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterWhatsnewPage } from './filter-whatsnew.page';

describe('FilterWhatsnewPage', () => {
  let component: FilterWhatsnewPage;
  let fixture: ComponentFixture<FilterWhatsnewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterWhatsnewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
