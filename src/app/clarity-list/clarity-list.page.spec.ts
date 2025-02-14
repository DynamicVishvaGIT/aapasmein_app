import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityListPage } from './clarity-list.page';

describe('ClarityListPage', () => {
  let component: ClarityListPage;
  let fixture: ComponentFixture<ClarityListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClarityListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
