import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCommunityPage } from './add-community.page';

describe('AddCommunityPage', () => {
  let component: AddCommunityPage;
  let fixture: ComponentFixture<AddCommunityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
