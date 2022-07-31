import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioGuardService implements CanActivate{

  realRole!: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const roles = this.tokenService.getAuthorities();
    this.realRole = 'user';
    roles.forEach(role => {
      if(role === 'ROLE_ADMIN') {
        this.realRole = 'admin';
      }
    });
    if(!this.tokenService.getToken()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
