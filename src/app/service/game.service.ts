import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game} from "../model/game.model";
import {Response} from "../model/response.model";
import {GameDetail} from "../model/game-detail.model";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  backendUrl = 'http://localhost:8080'
  constructor(private http: HttpClient) {
  }

  getPageCount(): Observable<Response<number>> {
    return this.http.get<Response<number>>(this.backendUrl + '/game/page-count', {
      observe: "body"
    })
  }

  getGames(page: number): Observable<Response<Game[]>> {
    return this.http.get<Response<Game[]>>(this.backendUrl + `/game/all?${page}`, {
      observe: "body"
    })
  }

  getGameDetail(gameId: string): Observable<Response<GameDetail>> {
    return this.http.get<Response<GameDetail>>(this.backendUrl + `/game?${gameId}`, {
      observe: "body"
    })
  }
}
