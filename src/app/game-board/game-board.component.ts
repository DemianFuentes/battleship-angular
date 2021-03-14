import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../services/board.service';
import { Board } from '../../model/board';
import { isValid } from 'ngx-bootstrap/chronos/create/valid';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  totalAttempts: number;
  currentAttempts: number = 0;
  board: Board;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService
  ) {  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.totalAttempts = params.attempts;
        this.createBoard();
      },
      err => console.error(err)
    );
  }

  createBoard() {
    const board = this.boardService.createBoard();
    this.board = board;
  }

  restartGame() {
    window.location.reload();
  }

  onFire() {
    this.currentAttempts += 1;
    if (this.board.areAllShipSunk()) {
      // TODO WIN GAME
      alert('WIN!');
    } else if (this.currentAttempts >= this.totalAttempts) {
      // TODO GAME OVER
      alert('GAME OVER!');
    }
  }
}
