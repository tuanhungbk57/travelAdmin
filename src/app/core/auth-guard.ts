import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
    private isLoggedIn() {
        if (localStorage.getItem('token')) {
            return true;
        }
        return false;
        // return moment().isBefore(this.getExpiration());
    }
}
