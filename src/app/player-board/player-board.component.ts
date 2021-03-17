import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Board } from '../../model/board';

@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.scss']
})
export class PlayerBoardComponent implements OnInit {

  @Input() board: Board;
  @Input() disabled: boolean;
  @Output() fired: EventEmitter<any> = new EventEmitter<any>();
  selectedTile = {showSelection: false, row: 0, col: 0};
  digitsPressed: string = '';

  // used to show 'X ships of Y tiles' legend. (sort by tiles asc)
  shipsAmountByTiles: { tiles: number, amount: number }[];

  constructor() { }

  ngOnInit() {
    const amountByTiles = this.board.ships.reduce((accum, ship) => {
      const spaces = ship.totalTiles;
      if (!accum[spaces]) {
        accum[spaces] = { tiles: spaces, amount: 0 };
      }
      accum[spaces].amount += 1;
      return accum;
    }, {});

    const amountByTitleList: { tiles: number, amount: number }[] = Object.values(amountByTiles);
    this.shipsAmountByTiles = amountByTitleList.sort((e1, e2) => e1.tiles - e2.tiles);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const maxRowIndex = this.board.tiles.length - 1;
    const maxColIndex = this.board.tiles[0].length - 1;

    if (this.disabled) {
      return;
    }

    this.selectedTile.showSelection = true;

    if (/^\d$/.test(event.key)) { // it's a digit
      this.digitsPressed += event.key;
      const targetCol = parseInt(this.digitsPressed) - 1;
      if (targetCol <= maxColIndex) {
        this.selectedTile.col = targetCol;
      }
      else {
        this.digitsPressed = '';
        if (parseInt(event.key) - 1 <= maxColIndex) {
          this.selectedTile.col = parseInt(event.key) - 1;
        }
      }
    }
    else {
      this.digitsPressed = '';
    }

    if (/^[a-zA-Z]$/.test(event.key)) { // it's a letter
      const targetRow = this.letterToNumber(event.key);
      if (targetRow <= maxRowIndex) {
        this.selectedTile.row = targetRow;
      }
    }
    else if (event.key === ' ' || event.key === 'Enter') {
      this.fire(this.board.tiles[this.selectedTile.row][this.selectedTile.col]);
    }
    else if (event.key === 'ArrowDown' && this.selectedTile.row < maxRowIndex) {
      this.selectedTile.row += 1;
    }
    else if (event.key === 'ArrowUp' && this.selectedTile.row > 0) {
      this.selectedTile.row -= 1;
    }
    else if (event.key === 'ArrowRight' && this.selectedTile.col < maxColIndex) {
      this.selectedTile.col += 1;
    }
    else if (event.key === 'ArrowLeft' && this.selectedTile.col > 0) {
      this.selectedTile.col -= 1;
    }
  }

  fire(tile: any) {
    if (this.isValidShot(tile)) {
      tile.used = true;

      const ship = tile.ship;
      if (ship) {
        ship.gettingShot();
      }

      this.fired.emit({targetShip: ship});
    }
  }

  isValidShot(tile: any): boolean {
    return !tile.used && !this.disabled;
  }

  /**
   * Converts the given number to corresponding letter (english alphabet)
   * @param number
   */
  numberToLetter(number: number) {
    number = number % 26;
    const leveller = 65; // mayus A
    return String.fromCharCode(number + leveller);
  }

  letterToNumber(char: string) {
    return (char.toUpperCase().charCodeAt(0) - 65) % 26;
  }

  arrayOf(number: number) {
    return Array(number).fill(undefined);
  }

  selectTile(row: number, col: number) {
    this.selectedTile.row = row;
    this.selectedTile.col = col;
    this.selectedTile.showSelection = true;
  }
}
