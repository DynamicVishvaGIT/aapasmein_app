import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConvenienceDetailsPage } from './convenience-details.page';

describe('ConvenienceDetailsPage', () => {
  let component: ConvenienceDetailsPage;
  let fixture: ComponentFixture<ConvenienceDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvenienceDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
