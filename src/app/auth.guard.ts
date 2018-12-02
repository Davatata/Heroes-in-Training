import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { HttpService } from './http-service.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private httpService: HttpService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.httpService.isLoggedIn()) {
            // logged in so return true
            console.log('passed through guard');
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
