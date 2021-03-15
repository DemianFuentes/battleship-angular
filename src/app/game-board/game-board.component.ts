import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../services/board.service';
import { Board } from '../../model/board';
import { PlayerService } from '../../services/player.service';
import { GameResult } from '../../model/game-result';
import { Difficulty } from '../../model/difficulty';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  board: Board;
  gameStatus: GameResult;
  currentDifficulty: Difficulty;
  finishedGame: boolean;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private playerService: PlayerService
  ) {  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        const attempts = params.attempts ? parseInt(params.attempts) : null;
        this.initGame(attempts);
        this.createBoard();
      },
      err => console.error(err)
    );
  }

  initGame(allowedAttempts: number) {
    this.currentDifficulty = Difficulty.getDifficultyByAttempts(allowedAttempts);
    this.gameStatus = new GameResult({
      startTime : new Date(),
      totalAttemptsAllowed : allowedAttempts,
      successfulAttempts : 0,
      usedAttempts : 0,
      win : false
    });
  }

  createBoard() {
    const board = this.boardService.createBoard();
    this.board = board;
  }

  restartGame() {
    window.location.reload();
  }

  onFire({targetShip: ship = null}) {
    this.gameStatus.usedAttempts += 1;
    if (ship) {
      this.gameStatus.successfulAttempts += 1;
    }
    if (this.isGameFinished()) {
      this.gameStatus.endTime = new Date();
      this.gameStatus.win = this.board.areAllShipSunk();
      this.playerService.storeGameResultForCurrentPlayer(this.gameStatus);

      setTimeout(() => this.finishedGame = true, 1500);
    }
  }

  isGameFinished() {
    return this.board.areAllShipSunk() ||
      (this.gameStatus.totalAttemptsAllowed && this.gameStatus.usedAttempts >= this.gameStatus.totalAttemptsAllowed);
  }
}
