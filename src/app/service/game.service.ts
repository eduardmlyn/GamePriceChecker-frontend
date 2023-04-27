import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game} from "../model/game.model";
import {Response} from "../model/response.model";
import {GameDetail} from "../model/game-detail.model";
import {Order, Sort} from "../model/enum";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  backendUrl = 'http://localhost:8080'
  page: number = 0
  isFavoritesPage: boolean = false

  constructor(private _http: HttpClient) {
  }

  getGameCount(search: string): Observable<Response<number>> {
    return this._http.get<Response<number>>(this.backendUrl + `/game/count?filter=${search}`, {
      observe: "body"
    })
  }

  getGames(page: number, pageSize: number, sort: Sort, order: Order, search: string): Observable<Response<Game[]>> {
    return this._http.get<Response<Game[]>>(this.backendUrl + `/game/all?page=${page}&pageSize=${pageSize}&sortBy=${sort}&order=${order}&filter=${search}`, {
      observe: "body"
    })
  }

  getGameDetail(gameId: string): Observable<Response<GameDetail>> {
    return this._http.get<Response<GameDetail>>(this.backendUrl + `/game?gameId=${gameId}`, {
      observe: "body"
    })
  }

  getUserGameCount(search: string): Observable<Response<number>> {
    return this._http.get<Response<number>>(this.backendUrl + `/user/favorites/count?filter=${search}`, {
      observe: "body"
    })
  }

  getUserGames(page: number, pageSize: number, sort: Sort, order: Order, search: String): Observable<Response<Game[]>> {
    return this._http.get<Response<Game[]>>(this.backendUrl + `/user/favorites?page=${page}&pageSize=${pageSize}&sortBy=${sort}&order=${order}&filter=${search}`, {
      observe: "body"
    })
  }

  gameToUser(gameId: string): Observable<Response<boolean>> {
    return this._http.post<Response<boolean>>(this.backendUrl + `/user/favorite?gameId=${gameId}`, {}, {observe: "body"})
  }

}
