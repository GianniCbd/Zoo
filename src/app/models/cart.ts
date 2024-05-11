import { Ticket } from './ticket';
import { User } from './user';

export interface Cart {
  id: number;

  ticketId: number;
  user: User;
  ticket?: Ticket;
}
