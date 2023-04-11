import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {JwtModel} from "../model/jwt.model";
import {Response} from "../model/response.model";
import {map, Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendUrl = 'http://localhost:8080'

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
      ),
      username,
      password
    )
  }

  login(username: string, password: string): Observable<boolean> {
    return this.mapResponse(
      this._httpClient.post<Response<JwtModel>>(
        this.backendUrl + '/auth/login',
        {username, password},
        {observe: "response"}
      ),
      username,
      password
    )
  }

  logout() {
    this._httpClient.post(this.backendUrl + '/user/logout',{})
    localStorage.removeItem("accessToken")
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem("accessToken") !== null
  }

  public getCurrentUserName(): Promise<string | null> | string | null {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      return null
    }
    return this._jwtHelper.decodeToken()
  }

  private mapResponse(resp: Observable<HttpResponse<Response<JwtModel>>>, username: string, password: string): Observable<boolean> {
    return resp.pipe(map(
      (response: HttpResponse<Response<JwtModel>>) => {
        const body = response.body
        if (body === null) {
          return false
        }
        if (response.status === 404) {
          return false
        }
        this.storeToken(body.data.token)
        return true
      }
    ))
  }

  private storeToken(token: string) {
    localStorage.setItem("accessToken", token)
    console.log(this._jwtHelper.decodeToken())
  }
}
