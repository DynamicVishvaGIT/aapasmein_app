import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatsnewListPage } from './whatsnew-list.page';

describe('WhatsnewListPage', () => {
  let component: WhatsnewListPage;
  let fixture: ComponentFixture<WhatsnewListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsnewListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
