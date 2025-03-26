import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAapasmeinPage } from './my-aapasmein.page';

describe('MyAapasmeinPage', () => {
  let component: MyAapasmeinPage;
  let fixture: ComponentFixture<MyAapasmeinPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAapasmeinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
