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

  constructor(private _http: HttpClient) {
  }

  getGameCount(): Observable<Response<number>> {
    return this._http.get<Response<number>>(this.backendUrl + '/game/count', {
      observe: "body"
    })
  }

  getGames(page: number, pageSize: number, sort: Sort, order: Order): Observable<Response<Game[]>> {
    return this._http.get<Response<Game[]>>(this.backendUrl + `/game/all?page=${page}&pageSize=${pageSize}&sortBy=${sort}&order=${order}`, {
      observe: "body"
    })
  }

  getGameDetail(gameId: string): Observable<Response<GameDetail>> {
    return this._http.get<Response<GameDetail>>(this.backendUrl + `/game?gameId=${gameId}`, {
      observe: "body"
    })
  }
}
