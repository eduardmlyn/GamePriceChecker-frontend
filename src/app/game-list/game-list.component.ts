import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../model/game.model";
import {GameService} from "../service/game.service";
import {map, take} from "rxjs";
import {Response} from "../model/response.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from '../service/auth.service';
import {BaseGameListComponent} from "../shared/abstract-game-list/base-game-list.component";

@Injectable()
@Component({
  selector: 'app-game-list',
  templateUrl: '../shared/abstract-game-list/base-game-list.component.html',
  styleUrls: ['../shared/abstract-game-list/base-game-list.component.scss']
})
export class GameListComponent extends BaseGameListComponent implements OnInit, OnDestroy {
  constructor(
    private _gameService: GameService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    super(_gameService, _route, _router)
  }

  ngOnInit(): void {
    this.getPageFromUrl()
    this.getGames()

    this.loggedInSubscription = this._authService.isLoggedIn.subscribe(state => this.showHeart = state)
    this._gameService.isFavoritesPage = false
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
    this.games$ = this._gameService.getGames(this.page, this.pageSize, this.sortBy, this.order, this.search).pipe(
      map((response: Response<Game[]>) => response.data)
    )
    this._gameService.getGameCount(this.search).pipe(take(1)).subscribe(
      res => {
        this.gameCount = res.data
        this.length = Math.ceil(this.gameCount / this.pageSize)
      }
    )
  }

  override onSearch(): void {
    this.getGames()
  }

  ngOnDestroy(): void {
    this.loggedInSubscription.unsubscribe()
  }
}
