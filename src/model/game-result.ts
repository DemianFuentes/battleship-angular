import { Player } from './player';

export class GameResult {

  successfulAttempts: number;
  usedAttempts: number;
  totalAttemptsAllowed: number;
  startTime: Date;
  endTime: Date;
  win: boolean;
  player: Player;

  constructor(props) {
    this.successfulAttempts = props.successfulAttempts;
    this.usedAttempts = props.usedAttempts;
    this.totalAttemptsAllowed = props.totalAttemptsAllowed;
    this.startTime = props.startTime;
    this.endTime = props.endTime;
    this.win = props.win;
    this.player = props.player;
  }

}
