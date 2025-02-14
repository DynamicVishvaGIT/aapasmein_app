import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AapasmeinFeaturesPage } from './aapasmein-features.page';

describe('AapasmeinFeaturesPage', () => {
  let component: AapasmeinFeaturesPage;
  let fixture: ComponentFixture<AapasmeinFeaturesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AapasmeinFeaturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
