import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game} from "../model/game.model";
import {Response} from "../model/response.model";
import {GameDetail} from "../model/game-detail.model";
import {Order} from "../model/enum/order.enum";
import {Sort} from "../model/enum/sort.enum"

@Injectable({
  providedIn: 'root'
})
export class GameService {
  backendUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) {
  }

  getGameCount(): Observable<Response<number>> {
    return this.http.get<Response<number>>(this.backendUrl + '/game/count', {
      observe: "body"
    })
  }

  getGames(page: number, pageSize: number, sort: Sort, order: Order): Observable<Response<Game[]>> {
    return this.http.get<Response<Game[]>>(this.backendUrl + `/game/all?page=${page}&pageSize=${pageSize}&sortBy=${sort}&order=${order}`, {
      observe: "body"
    })
  }

  getGameDetail(gameId: string): Observable<Response<GameDetail>> {
    return this.http.get<Response<GameDetail>>(this.backendUrl + `/game?gameId=${gameId}`, {
      observe: "body"
    })
  }
}
