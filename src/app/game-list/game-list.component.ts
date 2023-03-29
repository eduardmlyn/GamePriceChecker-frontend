import {Component, Injectable, OnInit} from '@angular/core';
import {Game} from "../model/game.model";
import {GameService} from "../service/game.service";
import {map, Observable} from "rxjs";
import {Response} from "../model/response.model";

@Injectable()
@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit{
  games$: Observable<Game[]>
  page: number = 1
  constructor(
    private _gameService: GameService
  ) {
    this.games$ = this._gameService.getGames(this.page).pipe(
      map((response: Response<Game[]>) => response.data)
    )
  }

  ngOnInit(): void {

  }

  // private getGames(): void { // TODO use in pagination
  //   this.games$ = this._gameService.getGames(this.page)
  // }
}
