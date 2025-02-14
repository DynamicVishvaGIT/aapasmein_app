import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingmodalPage } from './settingmodal.page';

describe('SettingmodalPage', () => {
  let component: SettingmodalPage;
  let fixture: ComponentFixture<SettingmodalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
