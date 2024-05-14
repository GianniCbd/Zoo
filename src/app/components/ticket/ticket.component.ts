import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { TicketService } from 'src/app/service/ticket.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  ticket: Ticket[] = [];
  newTicket: any = {};

  toBuy!: boolean;

  showAddModal: boolean = false;
  showEditModal: boolean = false;

  userId!: string;
  currentUser!: User;

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private authorizationSRV: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.fetchTickets();
  }

  loadTickets() {
    this.ticketService
      .getTickets()
      .pipe(
        map((tickets) => tickets.map((ticket) => ({ ...ticket, toBuy: false })))
      )
      .subscribe((ticket) => {
        this.ticket = ticket;
      });
  }

  addToCart(ticketId: number): void {
    this.ticketService.saveTicket(ticketId).subscribe(() => {
      const ticketIndex = this.ticket.findIndex(
        (ticket) => ticket.id === ticketId
      );
      if (ticketIndex !== -1) {
        this.ticket[ticketIndex].toBuy = !this.ticket[ticketIndex].toBuy;
      }
      alert('Hai aggiunto un biglietto al carrello');
      window.location.reload();
    });
  }

  canShowButton(): boolean {
    const allowedRoles: string[] = ['ADMIN', 'MANAGER'];
    return this.authorizationSRV.isAuthorized(allowedRoles);
  }

  openAddModal() {
    this.showAddModal = true;
  }
  openEditModal() {
    this.showEditModal = true;
  }
  closeAddModal() {
    this.showAddModal = false;
  }
  closeEditModal() {
    this.showEditModal = false;
  }

  fetchTickets() {
    this.ticketService.getTickets().subscribe((data) => {
      this.ticket = data;
      console.log(data);
    });
  }

  addNewTicket() {
    this.userService.getCurrentUser().subscribe((user) => {
      const userId = user.id;
      this.ticketService
        .newTicket(this.newTicket, userId)
        .subscribe((createdTicket) => {
          this.newTicket = {};
          this.ticket.push(createdTicket);
          this.showAddModal = true;
        });
    });
  }
  toggleModalVisibility() {
    this.showAddModal = !this.showAddModal;
  }
  close() {
    this.showAddModal = false;
  }

  // Assicurati di avere i tipi di Bootstrap se stai usando TypeScript
}
