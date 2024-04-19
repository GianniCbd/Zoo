import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../auth/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  currentUser: User | undefined;

  constructor(private authService: AuthService) {
    this.authService.getMe().subscribe((user: User | undefined) => {
      this.currentUser = user;
    });
  }

  isAuthorized(expectedRole: string[]): boolean {
    return !!(
      this.currentUser &&
      this.currentUser.roles.some((role) => expectedRole.includes(role.role))
    );
  }
}
