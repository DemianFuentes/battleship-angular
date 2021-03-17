import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBoardComponent } from './player-board.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Board } from '../../model/board';
import { Player } from '../../model/player';
import { Ship } from '../../model/ship';

const hasClass = function (element, cls) {
  return element.getAttribute('class').then(function (classes) {
    return classes.split(' ').indexOf(cls) !== -1;
  });
};

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

  it('should render amount of td tiles according to the board tiles', () => {
    const allTiles = fixture.nativeElement.querySelectorAll('td.battleship-tile');
    expect(allTiles.length).toBe(4);
  });

  it('should handle click on empty tile properly', () => {
    const emptyTile = fixture.nativeElement.querySelectorAll('td.battleship-tile')[1];
    component.fired.subscribe(event => {
      expect(event.targetShip).toBeUndefined();
      expect(component.board.tiles[0][1].used).toBeTruthy();
    });
    emptyTile.click();
  });

  it('should handle click on not empty tile properly', () => {
    const shipTile = fixture.nativeElement.querySelectorAll('td.battleship-tile')[0];
    const targetShip = component.board.ships[0];

    component.fired.subscribe(event => {
      expect(event.targetShip).toBe(targetShip);
      expect(component.board.tiles[0][0].used).toBeTruthy();
      expect(targetShip.sunkTiles).toBe(1);
      expect(targetShip.isSunk()).toBeFalsy();
    });

    shipTile.click();
  });

  it('should handle click to sink a ship tile properly', () => {
    const shipTile1 = fixture.nativeElement.querySelectorAll('td.battleship-tile')[0];
    const shipTile2 = fixture.nativeElement.querySelectorAll('td.battleship-tile')[2];
    const targetShip = component.board.ships[0];

    shipTile1.click();
    component.fired.subscribe(event => {
      expect(event.targetShip).toBe(targetShip);
      expect(component.board.tiles[1][0].used).toBeTruthy();
      expect(targetShip.sunkTiles).toBe(2);
      expect(targetShip.isSunk()).toBeTruthy();
    });
    shipTile2.click();
  });
});
