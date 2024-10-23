import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { CampoFiorito } from 'src/app/models/campo-fiorito';
import { User } from 'src/app/models/user';
import { CampoFioritoService } from 'src/app/service/campo-fiorito.service';

@Component({
  selector: 'app-campo-fiorito',
  templateUrl: './campo-fiorito.component.html',
  styleUrls: ['./campo-fiorito.component.scss'],
})
export class CampoFioritoComponent implements OnInit {
  gridSize: number = 10;
  numberOfLions: number = 10;
  grid: any[] = [];
  gameOver: boolean = false;
  leaderboard: any[] = [];

  currentUser!: User;
  isUserLoaded: boolean = false;

  constructor(
    private campoF: CampoFioritoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeGrid();
    this.getme();
  }

  getme() {
    this.authService.getMe().subscribe((it) => {
      this.currentUser = it;
    });
  }

  // Inizializza la griglia e posiziona i leoni
  initializeGrid() {
    this.grid = [];
    for (let row = 0; row < this.gridSize; row++) {
      let rowData = [];
      for (let col = 0; col < this.gridSize; col++) {
        rowData.push({
          hasLion: false,
          revealed: false,
          adjacentLions: 0,
        });
      }
      this.grid.push(rowData);
    }

    this.placeLions();
    this.calculateAdjacentLions();
  }

  // Funzione per posizionare i leoni casualmente
  placeLions() {
    let lionsPlaced = 0;
    while (lionsPlaced < this.numberOfLions) {
      let randomRow = Math.floor(Math.random() * this.gridSize);
      let randomCol = Math.floor(Math.random() * this.gridSize);
      if (!this.grid[randomRow][randomCol].hasLion) {
        this.grid[randomRow][randomCol].hasLion = true;
        lionsPlaced++;
      }
    }
  }

  // Funzione per calcolare i leoni adiacenti a ciascuna cella
  calculateAdjacentLions() {
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        if (!this.grid[row][col].hasLion) {
          this.grid[row][col].adjacentLions = this.countAdjacentLions(row, col);
        }
      }
    }
  }

  // Conta i leoni adiacenti a una specifica cella
  countAdjacentLions(row: number, col: number): number {
    let adjacentLions = 0;
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (this.isValidCell(r, c) && this.grid[r][c].hasLion) {
          adjacentLions++;
        }
      }
    }
    return adjacentLions;
  }

  // Controlla se la cella è valida (all'interno della griglia)
  isValidCell(row: number, col: number): boolean {
    return row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize;
  }

  // Azione al clic su una cella
  revealCell(row: number, col: number) {
    if (this.gameOver || this.grid[row][col].revealed) return;

    this.grid[row][col].revealed = true;
    if (this.grid[row][col].hasLion) {
      this.gameOver = true;
      alert('Hai trovato un leone! Game Over!');
    } else if (this.grid[row][col].adjacentLions === 0) {
      this.revealAdjacentCells(row, col);
    }

    this.checkWin();
  }

  // Rivela le celle adiacenti se non ci sono leoni vicini
  revealAdjacentCells(row: number, col: number) {
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (this.isValidCell(r, c) && !this.grid[r][c].revealed) {
          this.revealCell(r, c);
        }
      }
    }
  }

  // Controlla se l'utente ha vinto e invia il punteggio al backend
  checkWin() {
    let revealedCells = 0;
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        if (this.grid[row][col].revealed) {
          revealedCells++;
        }
      }
    }

    if (revealedCells === this.gridSize * this.gridSize - this.numberOfLions) {
      alert('Complimenti! Hai vinto!');
      this.gameOver = true;

      // Creiamo l'oggetto CampoFiorito da inviare al backend
      const campoFiorito: CampoFiorito = {
        id: 0, // Il backend dovrebbe generare questo valore
        score: revealedCells, // Puoi cambiare la logica del punteggio
        user: this.currentUser, // Usa l'utente corrente
      };

      this.campoF.submitScore(campoFiorito).subscribe((response) => {
        console.log('Punteggio inviato con successo:', response);
      });
    }
  }

  // Ricomincia il gioco
  restartGame() {
    this.gameOver = false;
    this.initializeGrid();
  }

  // Recupera la classifica dal backend
  getLeaderboard() {
    this.campoF.getLeaderboard().subscribe((data) => {
      this.leaderboard = data;
    });
  }
}
