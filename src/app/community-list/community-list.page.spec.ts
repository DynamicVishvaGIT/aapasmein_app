import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunityListPage } from './community-list.page';

describe('CommunityListPage', () => {
  let component: CommunityListPage;
  let fixture: ComponentFixture<CommunityListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
