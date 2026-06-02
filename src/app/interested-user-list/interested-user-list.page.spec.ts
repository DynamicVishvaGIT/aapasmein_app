import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterestedUserListPage } from './interested-user-list.page';

describe('InterestedUserListPage', () => {
  let component: InterestedUserListPage;
  let fixture: ComponentFixture<InterestedUserListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestedUserListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
