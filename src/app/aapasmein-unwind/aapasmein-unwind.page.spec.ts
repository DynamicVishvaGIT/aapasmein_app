import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AapasmeinUnwindPage } from './aapasmein-unwind.page';

describe('AapasmeinUnwindPage', () => {
  let component: AapasmeinUnwindPage;
  let fixture: ComponentFixture<AapasmeinUnwindPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AapasmeinUnwindPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
