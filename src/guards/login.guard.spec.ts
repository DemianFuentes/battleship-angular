import { TestBed, inject } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { PlayerService } from '../services/player.service';
import { StorageService } from '../services/storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

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

  it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
