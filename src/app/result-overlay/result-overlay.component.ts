import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-result-overlay',
  templateUrl: './result-overlay.component.html',
  styleUrls: ['./result-overlay.component.scss']
})
export class ResultOverlayComponent implements OnInit {

  @Input() show: boolean;
  @Input() win: boolean;
  @ViewChild(ConfirmationModalComponent) private clearGameHistoryConfirmationModal: ConfirmationModalComponent;

  constructor(
    public playerService: PlayerService
  ) { }

  ngOnInit() {
  }

  restartGame() {
    window.location.reload();
  }

  askForConfirmation() {
    this.clearGameHistoryConfirmationModal.show();
  }

  clearGameHistory() {
    this.playerService.clearGameHistory();
  }
}
