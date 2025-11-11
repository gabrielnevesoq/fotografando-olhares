import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaudosPage } from './laudos.page';

describe('LaudosPage', () => {
  let component: LaudosPage;
  let fixture: ComponentFixture<LaudosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LaudosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
