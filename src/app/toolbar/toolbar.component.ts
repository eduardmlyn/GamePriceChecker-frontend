import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { View } from '../model/enum';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  showUser$: Observable<boolean>
  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this.showUser$ = this._authService.isLoggedIn
  }
  onHomeClick() {
    this._router.navigate(['games'])
  }

  onRegisterClick() {
    this._router.navigate(['auth'], {queryParams: {view: View.REGISTER}})
  }

  onLoginClick() {
    this._router.navigate(['auth'], {queryParams: {view: View.LOGIN}})
  }

  onLogoutClick() {
    this._authService.logout()
  }

  onFavouritesClick() {
    this._router.navigate(['favorites'])
  }

  onProfileClick() {

  }
}
