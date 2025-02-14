import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvantageListPage } from './advantage-list.page';

describe('AdvantageListPage', () => {
  let component: AdvantageListPage;
  let fixture: ComponentFixture<AdvantageListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvantageListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
