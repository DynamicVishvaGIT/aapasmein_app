import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddbroadcastPage } from './addbroadcast.page';

describe('AddbroadcastPage', () => {
  let component: AddbroadcastPage;
  let fixture: ComponentFixture<AddbroadcastPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbroadcastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
