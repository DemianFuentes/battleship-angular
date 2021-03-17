import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from '../guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'setup', component: GameSetupComponent, canActivate: [LoginGuard] },
  { path: 'game', component: GameBoardComponent, canActivate: [LoginGuard] },

  // Otherwise redirect to home
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
