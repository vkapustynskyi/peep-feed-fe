import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../_services/AuthenticationService";
import {navigationRoutes} from "../navigationRoutes";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate([navigationRoutes.auth]);
      return false;
    }
    return true;
  }
}
