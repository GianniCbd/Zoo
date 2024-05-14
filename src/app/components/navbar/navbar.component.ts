import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/auth/auth/auth-data';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  utente!: AuthData | null;
  ticketCount: number = 0;
  currentUser!: User;
  userId!: string;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private cartSrv: CartService
  ) {}

  ngOnInit(): void {
    this.authSrv.restore();
    this.authSrv.user$.subscribe((user) => {
      this.utente = user;
    });
    this.getCurrentUser();
  }

  logout() {
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }

  getCurrentUser(): void {
    this.authSrv.getMe().subscribe((user: User) => {
      this.userId = user.id;
      this.getTicketCount();
    });
  }

  getTicketCount(): void {
    this.cartSrv.getTicketCountInCart(this.userId).subscribe({
      next: (count) => {
        this.ticketCount = count;
      },
      error: (error) => {
        console.error(
          'Errore durante il recupero del conteggio dei ticket',
          error
        );
      },
    });
  }
}
