import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Response} from "../model/response.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  backendUrl = 'http://localhost:8080'

  constructor(private _httpClient: HttpClient, private _jwtHelper: JwtHelperService) {
  }

  // TODO
  editUsername() {

  }

}
