import { Component, OnInit } from '@angular/core';
import { Card, CardType } from 'src/app/models/card';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { CardService } from 'src/app/service/card.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  cards: Card[] = [];
  myCards: Card[] = [];
  editingCard: any = null;

  // per inserimento spazi in cardNumber
  formattedCardNumber: string = '';

  // per inserimento svg alle cardType
  newCards = { cardType: '' };

  newCard: any = {};
  userId!: string;

  showAddModal: boolean = false;
  showEditModal: boolean = false;
  currentUser!: User;

  constructor(
    private cardSrv: CardService,
    private authorizationSRV: AuthorizationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getMyCards();
  }
  // visualizzatore modale
  canShowButton(): boolean {
    const allowedRoles: string[] = ['ADMIN', 'MANAGER', 'USER'];
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

  // ottengo la mia card
  getMyCards(): void {
    this.cardSrv.getMyCards().subscribe((page) => {
      this.cards = page.content.map((card) => ({
        ...card,
        formattedCardNumber: this.formatCardNumber(card.cardNumber),
      }));
    });
  }

  formatCardNumber(cardNumber: string): string {
    // Rimuove tutti i caratteri non numerici
    const cleanedNumber = cardNumber.replace(/\D/g, '');

    // Aggiunge uno spazio ogni 4 numeri
    const formattedNumber = cleanedNumber.replace(/(.{4})/g, '$1 ');

    return formattedNumber.trim(); // Rimuove gli spazi extra alla fine
  }

  // aggiunta nuova card
  addNewCard() {
    this.userService.getCurrentUser().subscribe((user) => {
      const userId = user.id;
      this.cardSrv.newCard(this.newCard, userId).subscribe((createdCard) => {
        this.newCard = {};
        this.cards.push(createdCard);
        this.showAddModal = false;
      });
    });
  }

  toggleModalVisibility() {
    this.showAddModal = !this.showAddModal;
  }
  close() {
    this.showAddModal = false;
  }

  // selezione svg card
  selectCard(cardType: string) {
    this.newCard.cardType = cardType;
  }

  cancelEdit() {
    this.editingCard = null;
    this.showEditModal = false;
  }

  // cancello card
  deleteCard(id: string): void {
    this.cardSrv.deleteCard(id).subscribe(() => {
      this.myCards = this.myCards.filter((card) => card.id !== id);

      this.getMyCards();
      window.location.reload();
    });
  }
}
