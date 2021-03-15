import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Player } from '../../model/player';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
  }

  selectLanguage(lang: string) {
    this.translate.use(lang);
    const player = this.playerService.getCurrentPlayer();
    player.lang = lang;
    this.playerService.storePlayer(player);
  }
}
