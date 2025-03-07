import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectionListPage } from './connection-list.page';

describe('ConnectionListPage', () => {
  let component: ConnectionListPage;
  let fixture: ComponentFixture<ConnectionListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
