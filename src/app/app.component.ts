import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private playerService: PlayerService
  ) {
    const player = playerService.getCurrentPlayer();
    const currentLang = player ? player.lang : null;
    translate.setDefaultLang(currentLang || 'en');
  }

}
