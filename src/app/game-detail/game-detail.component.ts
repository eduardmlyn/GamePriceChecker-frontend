import {Component, Injectable, OnInit} from '@angular/core';
import {GameDetail} from "../model/game-detail.model";
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../service/game.service";
import {Response} from "../model/response.model";
import {map, Observable, take} from "rxjs";
import { Seller } from '../model/enum';

@Injectable()
@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit{
  game$: Observable<GameDetail>

  constructor(
    private _gameService: GameService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    
  }

  ngOnInit(): void {
    const gameId = this._route.snapshot.paramMap.get("gameId")
    if (gameId === null) {
      this._router.navigate(['/error'])
      return
    }
    this.game$ = this._gameService.getGameDetail(gameId).pipe(map((response: Response<GameDetail>) => {
      return response.data}))
  }

  onLinkClick(link: string) {
    console.log(`clicked link: ${link}`)
  }
}
