import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalControlsPage } from './internal-controls.page';

describe('InternalControlsPage', () => {
  let component: InternalControlsPage;
  let fixture: ComponentFixture<InternalControlsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalControlsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
