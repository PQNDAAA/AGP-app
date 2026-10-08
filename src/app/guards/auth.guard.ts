import {CanActivate, CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth/auth-service";

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn() ? true : router.parseUrl('/auth');
};

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn() ?  router.parseUrl('/home') : true;
};
