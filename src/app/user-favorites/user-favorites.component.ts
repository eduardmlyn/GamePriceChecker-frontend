import {Component, OnInit} from '@angular/core';
import {map, Observable, take} from "rxjs";
import {Game} from "../model/game.model";
import {Order, Sort} from "../model/enum";
import {UserService} from "../service/user.service";
import {AuthService} from "../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {Response} from "../model/response.model";

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss']
})
export class UserFavoritesComponent implements OnInit{
  games$: Observable<Game[]>
  user$: Observable<boolean>
  page: number
  pageSize: number = 10
  sortBy: Sort = Sort.NAME
  order: Order = Order.ASC
  sortOptions = Sort
  selectedSort: Sort = Sort.NAME
  length: number = 0
  gameCount: number = 0

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.getPageFromUrl()
    this.getGames()
    this._userService.getGameCount().pipe(take(1)).subscribe(
      res => {
        this.gameCount = res.data
        this.length = Math.ceil(this.gameCount / this.pageSize)
      }
    )
  }

  onGameClick(game: Game) {
    this._userService.page = this.page
    this._router.navigate(['game', game.id])
  }

  onPageClick(e: PageEvent) {
    this.page = e.pageIndex
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { page: this.page },
      queryParamsHandling: "merge"
    })
    this.getGames()
  }

  onFavouriteClick(game: Game) {
    // TODO implement
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
    this.games$ = this._userService.getGames(this.page, this.pageSize, this.sortBy, this.order).pipe(
      map((response: Response<Game[]>) => response.data)
    )
  }

  private getPageFromUrl() {
    this._route.queryParams.subscribe(params => {
      this.page = +params["page"] || 0
    })
  }
}
