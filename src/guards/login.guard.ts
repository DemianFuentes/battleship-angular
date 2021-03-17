import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from '../services/player.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = !!this.playerService.getCurrentPlayer();
    if (isLoggedIn) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
