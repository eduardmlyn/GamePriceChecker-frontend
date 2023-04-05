import {Component, forwardRef, Injectable, OnInit} from '@angular/core';
import {Game} from "../model/game.model";
import {GameService} from "../service/game.service";
import {map, Observable, take} from "rxjs";
import {Response} from "../model/response.model";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {Order, Sort} from "../model/enum";

@Injectable()
@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit{
  games$: Observable<Game[]>
  page: number = 0
  pageSize: number = 25
  sortBy: Sort = Sort.NAME
  order: Order = Order.ASC
  sortOptions = Sort
  selectedSort: Sort = Sort.NAME
  length: number = 0
  gameCount: number = 0
  search: string = ''
  constructor(
    private _gameService: GameService,
    private _router: Router
  ) {  }

  ngOnInit(): void {
    // this.getGames()
    this._gameService.getGameCount().pipe(take(1)).subscribe(
      res => {
        this.gameCount = res.data
        this.length = Math.ceil(this.gameCount / this.pageSize)
      }
    )
  }

  onGameClick(game: Game) {
    this._router.navigate(['game', game.id])
  }

  onPageClick(e: PageEvent) {
    this.page = e.pageIndex
    this.getGames()
  }

  onFavouriteClick(game: Game) {
    console.log("heart button was clicked", game)
  }

  onSortChange() {
    this.sortBy = this.selectedSort
    this.getGames()
  }

  onChangeOrder() {
    this.order = this.order === Order.DESC ? Order.ASC : Order.DESC
    this.getGames()
  }

  private getGames() {
    this.games$ = this._gameService.getGames(this.page, this.pageSize, this.sortBy, this.order).pipe(
      map((response: Response<Game[]>) => response.data)
    )
  }
}
