import {Component} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {Game} from "../../model/game.model";
import {Order, Sort} from "../../model/enum";
import {AuthService} from "../../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {GameService} from "../../service/game.service";


@Component({
  selector: 'base-game-list',
  templateUrl: './base-game-list.component.html',
  styleUrls: ['./base-game-list.component.scss']
})
export class BaseGameListComponent {
  games$: Observable<Game[]>
  loggedInSubscription: Subscription
  page: number
  pageSize: number = 10
  sortBy: Sort = Sort.NAME
  order: Order = Order.ASC
  sortOptions = [Sort.NAME, Sort.RELEASE_DATE]
  selectedSort: Sort = Sort.NAME
  length: number = 0
  gameCount: number = 0
  search: string = ''
  showHeart: boolean = false

  constructor(
    private _baseGameService: GameService,
    private _baseRoute: ActivatedRoute,
    private _baseRouter: Router
  ) {
  }

  onGameClick(game: Game) {
    this._baseRouter.navigate(['game', game.id])
  }

  onPageClick(e: PageEvent) {
    this.page = e.pageIndex
    this._baseRouter.navigate([], {
      relativeTo: this._baseRoute,
      queryParams: {page: this.page},
      queryParamsHandling: "merge"
    })
  }

  onSortChange() {
    this.sortBy = this.selectedSort
  }

  onChangeOrder() {
    this.order = this.order === Order.DESC ? Order.ASC : Order.DESC
  }

  protected getPageFromUrl() {
    this._baseRoute.queryParams.subscribe(params => {
      this.page = +params["page"] || 0
    })
  }

  onFavouriteClick(game: Game) {
    this._baseGameService.gameToUser(game.id).subscribe()
  }

  getSortName(sort: Sort): string {
    switch (sort) {
      case Sort.NAME: {
        return 'Name'
      }
      case Sort.RELEASE_DATE: {
        return 'Release date'
      }
      default: {
        return ''
      }
    }
  }

  onFilter() {
    
  }
}
