import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardService } from '../services/board.service';
import { PlayerBoardComponent } from './player-board/player-board.component';
import { LoginComponent } from './login/login.component';
import { StorageService } from '../services/storage.service';
import { PlayerService } from '../services/player.service';
import { ResultOverlayComponent } from './result-overlay/result-overlay.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    GameSetupComponent,
    HeaderComponent,
    FooterComponent,
    GameBoardComponent,
    PlayerBoardComponent,
    LoginComponent,
    ResultOverlayComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [BoardService, StorageService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
