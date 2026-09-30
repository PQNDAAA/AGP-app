import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginAnimationPage } from './login-animation.page';

describe('LoginAnimationPage', () => {
  let component: LoginAnimationPage;
  let fixture: ComponentFixture<LoginAnimationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAnimationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
