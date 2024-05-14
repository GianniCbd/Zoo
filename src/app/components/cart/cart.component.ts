import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { Cart } from 'src/app/models/cart';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/service/cart.service';
import { TicketService } from 'src/app/service/ticket.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Cart[] = [];
  tickets: Ticket[] = [];

  userId!: string;
  ticketCount: number = 0;

  currentUser!: User;

  constructor(private authService: AuthService, private cartSrv: CartService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authService.getMe().subscribe((user: User) => {
      this.userId = user.id;
      this.getMyCart();
    });
  }

  getMyCart(): void {
    this.cartSrv.getMyCart(this.userId).subscribe((carts: Cart[]) => {
      this.cart = carts;
    });
  }

  deleteCart(cartToDelete: Cart) {
    if (cartToDelete && cartToDelete.id) {
      const selectedCartId = cartToDelete.id;
      this.cartSrv.deleteTicket(selectedCartId).subscribe(() => {
        const index = this.cart.findIndex((b: Cart) => b.id === selectedCartId);
        if (index !== -1) {
          this.cart.splice(index, 1);
        }
      });
      window.location.reload();
    } else {
      console.error(
        "Errore: l'oggetto cartToDelete o la sua proprietà 'id' sono undefined."
      );
    }
  }
}
