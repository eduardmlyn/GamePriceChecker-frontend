import {Component, OnInit} from '@angular/core';
import {map, take} from "rxjs";
import {Game} from "../model/game.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {Response} from "../model/response.model";
import {BaseGameListComponent} from "../shared/abstract-game-list/base-game-list.component";
import {GameService} from "../service/game.service";

@Component({
  selector: 'app-user-favorites',
  templateUrl: '../shared/abstract-game-list/base-game-list.component.html',
  styleUrls: ['../shared/abstract-game-list/base-game-list.component.scss']
})
export class UserFavoritesComponent extends BaseGameListComponent implements OnInit {

  constructor(
    private _gameService: GameService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    super(_gameService, _route, _router)
  }

  ngOnInit(): void {
    this.getPageFromUrl()
    this.getGames()
    this._gameService.isFavoritesPage = true
  }

  override onGameClick(game: Game) {
    this._gameService.page = this.page
    super.onGameClick(game)
  }

  override onPageClick(e: PageEvent) {
    super.onPageClick(e)
    this.getGames()
  }

  override onSortChange() {
    super.onSortChange()
    this.getGames()
  }

  override onChangeOrder() {
    super.onChangeOrder()
    this.getGames()
  }

  private getGames() {
    this.games$ = this._gameService.getUserGames(this.page, this.pageSize, this.sortBy, this.order, this.search).pipe(
      map((response: Response<Game[]>) => response.data)
    )
    this._gameService.getUserGameCount(this.search).pipe(take(1)).subscribe(
      res => {
        this.gameCount = res.data
        this.length = Math.ceil(this.gameCount / this.pageSize)
      }
    )
  }

  override onSearch(): void {
    this.getGames()
  }
}
