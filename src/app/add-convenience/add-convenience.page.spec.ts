import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddConveniencePage } from './add-convenience.page';

describe('AddConveniencePage', () => {
  let component: AddConveniencePage;
  let fixture: ComponentFixture<AddConveniencePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConveniencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
