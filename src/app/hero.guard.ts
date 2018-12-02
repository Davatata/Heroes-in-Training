import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { HttpService } from './http-service.service';

@Injectable()
export class HeroGuard implements CanActivate {

    constructor(private router: Router, private httpService: HttpService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.httpService.isHeroStored()) {
            // hero is stored so return true
            console.log('passed hero guard');
            return true;
        }

        // hero not stored so redirect to gallery page
        this.router.navigate(['/gallery']);
        return false;
    }
}
