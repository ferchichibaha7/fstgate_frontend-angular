import { TokenStorageService } from './Auth/token-storage.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  constructor(private storage: TokenStorageService,
              private router: Router
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.storage.isUserLoggedIn()) {
     return true;
    }

    this.router.navigate(['/login']) ;

    return false;
  }
}
