import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Response} from "../model/response.model";
import {JwtModel} from "../model/jwt.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  backendUrl = 'http://localhost:8080'
  page: number = 0

  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) {
  }

  editUsername(username: string): Observable<boolean> {
    return this._http.put<Response<JwtModel>>(this.backendUrl + `/user/edit-username?username=${username}`,
      {},
      {observe: "response"}
    ).pipe(
      map(
        (response: HttpResponse<Response<JwtModel>>) => {
          const body = response.body
          if (body == null) {
            return false
          }
          localStorage.setItem("accessToken", body.data.token)
          return true
        }
      ),
      catchError(_ => {
        return of(false) as Observable<boolean>
      })
    )
  }

  deleteUser(): Observable<boolean> {
    return this._http.delete<Response<boolean>>(this.backendUrl + '/user/opt-out', {observe: "response"}).pipe(
      map(
        (response: HttpResponse<Response<boolean>>) => {
          const body = response.body;
          return body != null;

        }
      ),
      catchError(_ => {
        return of(false) as Observable<boolean>;
      })
    );
  }
}
