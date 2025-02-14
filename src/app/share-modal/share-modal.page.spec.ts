import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShareModalPage } from './share-modal.page';

describe('ShareModalPage', () => {
  let component: ShareModalPage;
  let fixture: ComponentFixture<ShareModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
