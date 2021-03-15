import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('playerNameInput') playerNameInput: ElementRef;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const currentPlayer = this.playerService.getCurrentPlayer();
    const playerName = currentPlayer ? currentPlayer.name : '';
    this.loginForm = this.formBuilder.group({
      playerName: [playerName, [Validators.required]]
    });

    this.playerNameInput.nativeElement.focus();
  }

  get playerName() { return this.loginForm.get('playerName'); }

  login() {
    if (this.loginForm.valid) {
      this.playerService.storePlayerName(this.playerName.value);
      this.router.navigate(['/setup']);
    }
  }

  /* TODO multiplayer
  validateDuplicatedPlayerName(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const invalid = true;
      return invalid ? {usedPlayerName: {value: control.value}} : null;
    };
  }
  */
}
