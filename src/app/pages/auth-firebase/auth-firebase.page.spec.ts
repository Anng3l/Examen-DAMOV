import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFirebasePage } from './auth-firebase.page';

describe('AuthFirebasePage', () => {
  let component: AuthFirebasePage;
  let fixture: ComponentFixture<AuthFirebasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFirebasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
