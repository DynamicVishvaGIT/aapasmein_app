import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterBroadcastPage } from './filter-broadcast.page';

describe('FilterBroadcastPage', () => {
  let component: FilterBroadcastPage;
  let fixture: ComponentFixture<FilterBroadcastPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBroadcastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
