import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {FormControl, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  view: 'login' | 'register' = 'login'
  hide = true
  username = new FormControl('', [Validators.required])

  constructor(private _authService: AuthService) {
  }

  toggleView(view: 'login' | 'register') {
    this.view = view
  }

  getErrorMessage(): string {
    if (this.username.hasError('required')) {
      return 'You must enter a value'
    }
    return ''
  }

  onSubmit(f: NgForm) {
    console.log(f.value)
    console.log(f.valid)
  }
}
