import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {GameDetailComponent} from "./game-detail/game-detail.component";
import {GameListComponent} from "./game-list/game-list.component";


const routes: Routes = [
  {path: '', redirectTo: '/games', pathMatch: "full"},
  {path: 'games', component: GameListComponent},
  {path: 'game/:gameId', component: GameDetailComponent}
//  TODO add routes to login/user detail
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
