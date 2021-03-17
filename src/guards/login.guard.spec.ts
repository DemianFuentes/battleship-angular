import { TestBed, inject } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { PlayerService } from '../services/player.service';
import { StorageService } from '../services/storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Player } from '../model/player';
import { Router } from '@angular/router';

describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
        RouterTestingModule
      ],
      providers: [
        LoginGuard,
        PlayerService,
        StorageService
      ]
    });
  });

  it('should reject not logged in user', inject([LoginGuard], (guard: LoginGuard) => {
    const playerService: PlayerService = TestBed.get(PlayerService);
    spyOn(playerService, 'getCurrentPlayer').and.returnValue(null);

    const router = TestBed.get(Router);
    spyOn(router, 'navigate');

    expect(guard).toBeTruthy();
    expect(guard.canActivate(null, null)).toBeFalsy();
    expect(playerService.getCurrentPlayer).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should not reject logged in user', inject([LoginGuard], (guard: LoginGuard) => {
    const playerService: PlayerService = TestBed.get(PlayerService);
    const dummyPlayer = new Player({name: 'dummy', lang: 'es'});
    spyOn(playerService, 'getCurrentPlayer').and.returnValue(dummyPlayer);

    expect(guard).toBeTruthy();
    expect(guard.canActivate(null, null)).toBeTruthy();
    expect(playerService.getCurrentPlayer).toHaveBeenCalled();
  }));
});
