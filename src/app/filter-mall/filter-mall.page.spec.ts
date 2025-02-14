import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterMallPage } from './filter-mall.page';

describe('FilterMallPage', () => {
  let component: FilterMallPage;
  let fixture: ComponentFixture<FilterMallPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
