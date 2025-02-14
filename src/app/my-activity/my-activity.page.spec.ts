import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyActivityPage } from './my-activity.page';

describe('MyActivityPage', () => {
  let component: MyActivityPage;
  let fixture: ComponentFixture<MyActivityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
