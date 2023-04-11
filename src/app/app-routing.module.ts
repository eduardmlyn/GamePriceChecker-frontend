import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {GameDetailComponent} from "./game-detail/game-detail.component";
import {GameListComponent} from "./game-list/game-list.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {AuthPageComponent} from "./auth-page/auth-page.component";
import {AuthGuard} from "./auth.guard";


const routes: Routes = [
  {path: '', redirectTo: '/games', pathMatch: "full"},
  {path: 'games', component: GameListComponent},
  {path: 'game/:gameId', component: GameDetailComponent},
  {path: 'auth', component: AuthPageComponent},
  {path: 'user', component: UserDetailComponent, canActivate: [AuthGuard]},
  {path: '**', component: ErrorPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
