import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BroadcastDetailsPage } from './broadcast-details.page';

describe('BroadcastDetailsPage', () => {
  let component: BroadcastDetailsPage;
  let fixture: ComponentFixture<BroadcastDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
