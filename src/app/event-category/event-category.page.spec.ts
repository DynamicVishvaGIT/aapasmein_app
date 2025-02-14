import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventCategoryPage } from './event-category.page';

describe('EventCategoryPage', () => {
  let component: EventCategoryPage;
  let fixture: ComponentFixture<EventCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
