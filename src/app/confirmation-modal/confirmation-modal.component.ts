import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @ViewChild('modal') modal: ModalDirective;
  @Input() title: string = 'Confirmation';
  @Input() text: string = 'Are you sure?';
  @Input() yesText: string = 'Yes';
  @Input() noText: string = 'No';
  @Input() size: string = 'sm';

  @Output() yesClicked = new EventEmitter();
  @Output() noClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleYes() {
    this.yesClicked.emit();
    this.modal.hide();
  }

  handleNo() {
    this.noClicked.emit();
    this.modal.hide();
  }

  public show() {
    this.modal.show();
  }

}
