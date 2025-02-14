import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddmallPage } from './addmall.page';

describe('AddmallPage', () => {
  let component: AddmallPage;
  let fixture: ComponentFixture<AddmallPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
