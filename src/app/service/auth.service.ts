import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {JwtModel} from "../model/jwt.model";
import {Response} from "../model/response.model";
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendUrl = 'http://localhost:8080'

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)

  constructor(
    private _httpClient: HttpClient,
    private _jwtHelper: JwtHelperService,
    private _userService: UserService
  ) {
  }

  register(username: string, password: string): Observable<boolean> {
    return this.mapResponse(
      this._httpClient.post<Response<JwtModel>>(
        this.backendUrl + '/auth/register',
        {username, password},
        {observe: "response"}
      )
    )
  }

  login(username: string, password: string): Observable<boolean> {
    return this.mapResponse(
      this._httpClient.post<Response<JwtModel>>(
        this.backendUrl + '/auth/login',
        {username, password},
        {observe: "response"}
      )
    )
  }

  logout() {
    this._httpClient.post(this.backendUrl + '/user/logout',{})
    localStorage.removeItem("accessToken")
    this._isLoggedIn$.next(false)
  }

  get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn$.asObservable()
  }

  public getCurrentUserName(): Promise<string | null> | string | null {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      return null
    }
    return this._jwtHelper.decodeToken()
  }

  // is HttpResponse needed?
  private mapResponse(resp: Observable<HttpResponse<Response<JwtModel>>>): Observable<boolean> {
    return resp.pipe(
      map(
        (response: HttpResponse<Response<JwtModel>>) => {
          const body = response.body
          if (body === null) {
            return false
          }
          this.storeToken(body.data.token)
          this._isLoggedIn$.next(true)
          return true
        }
      ),
      catchError(_ => {
        return of(false) as Observable<boolean>
      })
    )
  }

  private storeToken(token: string) {
    localStorage.setItem("accessToken", token)
    console.log(this._jwtHelper.decodeToken())
  }
}
