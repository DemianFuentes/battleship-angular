import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { LoginComponent } from './login/login.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PlayerBoardComponent } from './player-board/player-board.component';
import { ResultOverlayComponent } from './result-overlay/result-overlay.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { PlayerService } from '../services/player.service';
import { StorageService } from '../services/storage.service';
import { BoardService } from '../services/board.service';
import { Player } from '../model/player';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot()
      ],
      declarations: [
        AppComponent,
        ConfirmationModalComponent,
        FooterComponent,
        GameSetupComponent,
        GameBoardComponent,
        HeaderComponent,
        LoginComponent,
        PlayerBoardComponent,
        ResultOverlayComponent
      ],
      providers: [
        BoardService,
        PlayerService,
        StorageService,
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`navigate to "" should redirect to /login`, async(() => {
    const router = TestBed.get(Router);
    const location = TestBed.get(Location);

    router.initialNavigation();
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/login');
    });
  }));

  it('should use \'en\' as default language', async(() => {
    const translateService: TranslateService = TestBed.get(TranslateService);
    const playerService: PlayerService = TestBed.get(PlayerService);

    spyOn(translateService, 'setDefaultLang');
    const dummyPlayer = new Player({name: 'dummy', lang: 'es'});
    spyOn(playerService, 'getCurrentPlayer').and.returnValue(null);

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    fixture.detectChanges();

    expect(playerService.getCurrentPlayer).toHaveBeenCalled();
    expect(translateService.setDefaultLang).toHaveBeenCalledWith('en');
  }));

  it('should use current user selected language', async(() => {
    const translateService: TranslateService = TestBed.get(TranslateService);
    const playerService: PlayerService = TestBed.get(PlayerService);

    spyOn(translateService, 'setDefaultLang');
    const dummyPlayer = new Player({name: 'dummy', lang: 'es'});
    spyOn(playerService, 'getCurrentPlayer').and.returnValue(dummyPlayer);

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    fixture.detectChanges();

    expect(playerService.getCurrentPlayer).toHaveBeenCalled();
    expect(translateService.setDefaultLang).toHaveBeenCalledWith('es');
  }));

});
