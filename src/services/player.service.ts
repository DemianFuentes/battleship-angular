import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Player } from '../model/player';
import { GameResult } from '../model/game-result';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class PlayerService {

  static KEY_CURRENT_PLAYER = 'bs-game-player';
  static KEY_GAME_HISTORY = 'bs-game-history';

  constructor(
    private storageService: StorageService,
    private translate: TranslateService
  ) { }

  storePlayerName(playerName: string) {
    const currentPlayer = new Player({name: playerName, lang: this.translate.currentLang});
    this.storePlayer(currentPlayer);
  }

  storePlayer(player: Player) {
    this.storageService.store(PlayerService.KEY_CURRENT_PLAYER, player);
  }

  getCurrentPlayer(): Player {
    return new Player(this.storageService.get(PlayerService.KEY_CURRENT_PLAYER));
  }

  storeGameResultForCurrentPlayer(gameStatus: GameResult) {
    const allGames = this.getGameHistory();
    gameStatus.player = this.getCurrentPlayer();
    allGames.unshift(gameStatus);
    this.storageService.store(PlayerService.KEY_GAME_HISTORY, allGames);
  }

  getGameHistory(): GameResult[] {
    const results = this.storageService.get(PlayerService.KEY_GAME_HISTORY);
    return results || [];
  }

  clearGameHistory() {
    this.storageService.delete(PlayerService.KEY_GAME_HISTORY);
  }
}
