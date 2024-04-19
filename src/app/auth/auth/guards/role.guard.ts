import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  me: User | undefined;
  constructor(private authSrv: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authSrv.getMe().pipe(
      map((user: User | undefined) => {
        console.log('Current User:', user);
        if (
          user &&
          user.roles.some((role) =>
            route.data['expectedRole'].includes(role.role)
          )
        ) {
          console.log('User Role:', user.roles);
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
