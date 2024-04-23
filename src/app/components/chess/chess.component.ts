import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

interface Position {
  row: number;
  col: number;
}

const displayPieces: Record<string, string> = {
  blackpawn: '🐐',
  blackking: '🦁',
  blackqueen: '🦚',
  blackrook: '🦍	',
  blackknight: '🐎',
  blackbishop: '🦦',
  whitepawn: '🐑',
  whiteking: '🦈',
  whitequeen: '🦢',
  whiterook: '🦏',
  whiteknight: '🐫',
  whitebishop: '🦥',
};

interface Piece {
  type: string;
  color: 'white' | 'black';
}

interface Cell {
  piece?: Piece;
}

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss'],
})
export class ChessComponent {
  infoPanelOpen = false;
  infoPanelOpen2 = false;
  toggleInfoPanel() {
    this.infoPanelOpen = !this.infoPanelOpen;
  }
  toggleInfoPanel2() {
    this.infoPanelOpen2 = !this.infoPanelOpen2;
  }

  board: Cell[][] = createBoard();

  displayPiece(row: number, col: number): string {
    const p = this.board[row][col].piece;
    return p ? displayPieces[`${p.color}${p.type}`] : '';
  }

  getPieceColor(row: number, col: number) {
    return this.board[row][col].piece?.color;
  }

  validMove(
    oldRow: number,
    oldCol: number,
    newRow: number,
    newCol: number
  ): boolean {
    const piece = this.board[oldRow][oldCol].piece;

    switch (piece?.type) {
      case 'pawn':
        const moveDirection = piece.color == 'white' ? -1 : 1;
        return newRow == oldRow + moveDirection && newCol == oldCol;

      case 'queen':
        const rowDiff2 = Math.abs(newRow - oldRow);
        const colDiff2 = Math.abs(newCol - oldCol);
        if (newRow === oldRow || newCol === oldCol || rowDiff2 === colDiff2) {
          const rowIncrement =
            newRow === oldRow ? 0 : (newRow - oldRow) / rowDiff2;
          const colIncrement =
            newCol === oldCol ? 0 : (newCol - oldCol) / colDiff2;
          let i = oldRow + rowIncrement;
          let j = oldCol + colIncrement;

          while (i !== newRow || j !== newCol) {
            if (this.board[i][j].piece) {
              return false;
            }
            i += rowIncrement;
            j += colIncrement;
          }
          const destinationPiece = this.board[newRow][newCol].piece;
          if (!destinationPiece || destinationPiece.color !== piece.color) {
            return true;
          }
        }
        return false;

      case 'king':
        const rowDiff4 = Math.abs(newRow - oldRow);
        const colDiff4 = Math.abs(newCol - oldCol);

        if (rowDiff4 <= 1 && colDiff4 <= 1) {
          const destinationPiece = this.board[newRow][newCol].piece;
          if (!destinationPiece || destinationPiece.color !== piece.color) {
            return true;
          }
        }

        return false;

      case 'rook':
        if (newRow === oldRow || newCol === oldCol) {
          const min = Math.min(oldRow, newRow);
          const max = Math.max(oldRow, newRow);
          const rowIncrement = (newRow - oldRow) / Math.abs(newRow - oldRow);
          const colIncrement = (newCol - oldCol) / Math.abs(newCol - oldCol);
          for (
            let i = min + rowIncrement, j = oldCol + colIncrement;
            i < max;
            i += rowIncrement, j += colIncrement
          ) {
            if (this.board[i][j].piece) {
              return false;
            }
          }
          const destinationPiece = this.board[newRow][newCol].piece;
          if (!destinationPiece || destinationPiece.color !== piece.color) {
            return true;
          }
        }

        return false;

      case 'knight':
        const rowDiff3 = Math.abs(newRow - oldRow);
        const colDiff3 = Math.abs(newCol - oldCol);

        if (
          (rowDiff3 === 2 && colDiff3 === 1) ||
          (rowDiff3 === 1 && colDiff3 === 2)
        ) {
          const destinationPiece = this.board[newRow][newCol].piece;
          if (!destinationPiece || destinationPiece.color !== piece.color) {
            return true;
          }
        }

        return false;

      case 'bishop':
        const rowDiff = Math.abs(newRow - oldRow);
        const colDiff = Math.abs(newCol - oldCol);
        if (rowDiff === colDiff) {
          const destinationPiece = this.board[newRow][newCol].piece;
          if (!destinationPiece || destinationPiece.color !== piece.color) {
            return true;
          }
        }

        return false;
      default:
        return false;
    }
  }

  move(event: CdkDragDrop<any, Position, Position>) {
    const oldPos = event.item.data;
    const newPos = event.container.data;

    if (this.validMove(oldPos.row, oldPos.col, newPos.row, newPos.col)) {
      const piece = this.board[oldPos.row][oldPos.col];
      this.board[oldPos.row][oldPos.col] = {};
      this.board[newPos.row][newPos.col] = piece;
    }
  }
}

function createBoard(): Cell[][] {
  const board: Cell[][] = [];
  for (let i = 0; i < 8; i++) {
    board.push([]);
    for (let j = 0; j < 8; j++) {
      const cell: Cell = {};
      cell.piece = getStartingPiece(i, j, board);
      board[i].push(cell);
    }
  }
  return board;
}

function getStartingPiece(row: number, col: number, board: Cell[][]) {
  const color = row <= 1 ? 'black' : 'white';

  if (row === 1 || row == 6) {
    return pawn(board, color);
  }

  if (row == 0 || row == 7) {
    switch (col) {
      case 0:
      case 7:
        return rook(board, color);
      case 1:
      case 6:
        return bishop(board, color);
      case 2:
      case 5:
        return knight(board, color);
      case 3:
        return row == 0 ? queen(board, color) : king(board, color);
      case 4:
        return row == 0 ? king(board, color) : queen(board, color);
    }
  }

  return undefined;
}

function pawn(board: Cell[][], color: 'white' | 'black'): Piece {
  return {
    type: 'pawn',
    color,
  };
}
function queen(board: Cell[][], color: 'white' | 'black'): Piece {
  return {
    type: 'queen',
    color,
  };
}

function king(board: Cell[][], color: 'white' | 'black'): Piece {
  return {
    type: 'king',
    color,
  };
}

function rook(board: Cell[][], color: 'white' | 'black'): Piece {
  return {
    type: 'rook',
    color,
  };
}

function bishop(board: Cell[][], color: 'white' | 'black'): Piece {
  return {
    type: 'bishop',
    color,
  };
}

function knight(board: Cell[][], color: 'white' | 'black'): Piece {
  return {
    type: 'knight',
    color,
  };
}

function isValidMove() {}
