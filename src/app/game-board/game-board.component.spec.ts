import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayerBoardComponent } from '../player-board/player-board.component';
import { ResultOverlayComponent } from '../result-overlay/result-overlay.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BoardService } from '../../services/board.service';
import { PlayerService } from '../../services/player.service';
import { StorageService } from '../../services/storage.service';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
        RouterTestingModule,
        ModalModule.forRoot()
      ],
      declarations: [
        GameBoardComponent,
        PlayerBoardComponent,
        ResultOverlayComponent,
        ConfirmationModalComponent
      ],
      providers: [
        BoardService,
        PlayerService,
        StorageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
