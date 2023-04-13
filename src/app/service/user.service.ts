import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Response} from "../model/response.model";
import {Order, Sort} from "../model/enum";
import {Game} from "../model/game.model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  backendUrl = 'http://localhost:8080'
  page: number = 0

  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) {
  }

  // TODO
  editUsername() {

  }

  getGameCount(): Observable<Response<number>> {
    return this._http.get<Response<number>>(this.backendUrl + '/user/favorites/count', {
      observe: "body"
    })
  }

  getGames(page: number, pageSize: number, sort: Sort, order: Order): Observable<Response<Game[]>> {
    return this._http.get<Response<Game[]>>(this.backendUrl + `/user/favorites?page=${page}&pageSize=${pageSize}`, { // &sortBy=${sort}&order=${order}
      observe: "body"
    })
  }

}
