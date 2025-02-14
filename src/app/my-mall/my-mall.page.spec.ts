import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyMallPage } from './my-mall.page';

describe('MyMallPage', () => {
  let component: MyMallPage;
  let fixture: ComponentFixture<MyMallPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
