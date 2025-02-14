import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedItemsListPage } from './saved-items-list.page';

describe('SavedItemsListPage', () => {
  let component: SavedItemsListPage;
  let fixture: ComponentFixture<SavedItemsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedItemsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
