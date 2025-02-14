import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AapasmeinWallPage } from './aapasmein-wall.page';

describe('AapasmeinWallPage', () => {
  let component: AapasmeinWallPage;
  let fixture: ComponentFixture<AapasmeinWallPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AapasmeinWallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
