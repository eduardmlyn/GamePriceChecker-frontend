import {Component, Injectable, OnInit} from '@angular/core';
import {GameDetail} from "../model/game-detail.model";
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../service/game.service";
import {Response} from "../model/response.model";
import {map, Observable, take} from "rxjs";

@Injectable()
@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit{
  // game!: Observable<GameDetail>
  gameData: GameDetail

  constructor(
    private _gameService: GameService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    console.log("got here")
    const gameId = _route.snapshot.paramMap.get("gameId")
    if (gameId === null) {
      // TODO implement error page
      _router.navigate(['/error'])
      return
    }
    // this.game = _gameService.getGameDetail(gameId).pipe(
    //   map((response: Response<GameDetail>) => response.data)
    // )
    _gameService.getGameDetail(gameId).pipe(take(1)).subscribe(res =>
      this.gameData = res.data
    )
  }

  ngOnInit(): void {
  }

}
