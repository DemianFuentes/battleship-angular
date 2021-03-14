import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/setup', pathMatch: 'full' },
  { path: 'setup', component: GameSetupComponent },
  { path: 'game', component: GameBoardComponent },

  // Otherwise redirect to home
  { path: '**', redirectTo: 'setup', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
