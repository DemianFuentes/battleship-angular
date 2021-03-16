import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBoardComponent } from './player-board.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Board } from '../../model/board';
import { Player } from '../../model/player';
import { Ship } from '../../model/ship';

describe('PlayerBoardComponent', () => {
  let component: PlayerBoardComponent;
  let fixture: ComponentFixture<PlayerBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      declarations: [ PlayerBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBoardComponent);
    component = fixture.componentInstance;

    const player = new Player({name: 'playerName', lang: 'en'});
    const ship = new Ship(2);
    const tiles = [
      [{ ship: ship, used: false }, { ship: undefined, used: false }],
      [{ ship: ship, used: false }, { ship: undefined, used: false }]
    ];
    component.board = new Board(player, tiles, [ship]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
