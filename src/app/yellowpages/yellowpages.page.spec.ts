import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YellowpagesPage } from './yellowpages.page';

describe('YellowpagesPage', () => {
  let component: YellowpagesPage;
  let fixture: ComponentFixture<YellowpagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(YellowpagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
