import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
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
  // codice per inserire gli spazi vuoti ogni 4numeri nel cardNumber
  formatCardNumber(rawNumber: string): void {
    this.formattedCardNumber = rawNumber
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ');
  }
  // aggiunta nuova card
  addNewCard() {
    this.userService.getCurrentUser().subscribe(
      (user) => {
        const userId = user.id;
        this.cardSrv.newCard(this.newCard, userId).subscribe(
          (createdCard) => {
            this.newCard = {};
            this.cards.push(createdCard);
            this.showAddModal = true;
          },
          (error) => {
            console.error('Error creating card:', error);
          }
        );
      },
      (error) => {
        console.error('Error getting current user:', error);
      }
    );
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

  // effettua pagamento
  makePayment(cardId: string, amount: number): void {
    this.cardSrv.makePayment(cardId, amount).subscribe(
      (response) => {
        console.log('Pagamento effettuato con successo:', response);
        // Aggiungi qui la logica per gestire la risposta dal backend (ad esempio, aggiornare l'interfaccia utente)
      },
      (error) => {
        console.error('Errore durante il pagamento:', error);
        // Aggiungi qui la logica per gestire gli errori (ad esempio, mostrare un messaggio di errore all'utente)
      }
    );
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
