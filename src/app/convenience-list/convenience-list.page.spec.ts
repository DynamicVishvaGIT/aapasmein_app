import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConvenienceListPage } from './convenience-list.page';

describe('ConvenienceListPage', () => {
  let component: ConvenienceListPage;
  let fixture: ComponentFixture<ConvenienceListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvenienceListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
