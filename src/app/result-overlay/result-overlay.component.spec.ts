import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultOverlayComponent } from './result-overlay.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PlayerService } from '../../services/player.service';
import { StorageService } from '../../services/storage.service';

describe('ResultOverlayComponent', () => {
  let component: ResultOverlayComponent;
  let fixture: ComponentFixture<ResultOverlayComponent>;

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
        ResultOverlayComponent,
        ConfirmationModalComponent
      ],
      providers: [
        PlayerService,
        StorageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
