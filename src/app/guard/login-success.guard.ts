import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CovidService } from 'src/services/covid.service';

@Injectable({
  providedIn: 'root'
})
export class LoginSuccessGuard implements CanActivate {
  constructor(private service: CovidService, private router: Router) {

  }
  canActivate() {
    if (this.service.loginStatus) {
      return true;
    }
    this.router.navigate(['login'])
    return false;
  }
  
}
