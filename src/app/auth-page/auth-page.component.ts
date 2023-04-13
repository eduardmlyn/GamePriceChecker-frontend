import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Observable, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { View } from '../model/enum';

interface FormValues {
  name: string,
  password: string
}

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  view: View = View.LOGIN
  viewType = View
  hide = true
  form: FormGroup & { value: FormValues }
  error: string = ''

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    }) as FormGroup & { value: FormValues }
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      if (Object.values(this.viewType).includes(params["view"])) {
        this.view = params["view"]
      }
    })
  }

  toggleView(view: View) {
    this.view = view
  }

  getErrorMessage(): string {
    if (this.form.hasError('required')) {
      return 'You must enter a value'
    }
    return ''
  }

  onSubmit() {
    const username = this.form.value.name
    const password = this.form.value.password
    if (this.view === View.LOGIN) {
      this.processSubmit(this._authService.login(username, password))
      return
    }
    this.processSubmit(this._authService.register(username, password))
  }

  private processSubmit(res: Observable<boolean>) {
    res.pipe(take(1)).subscribe(
      res => {
        if (res) {
          this._router.navigate(['games'])
          return
        }
        if (this.view === View.LOGIN) {
          this.error = 'Bad credentials'
          return
        }
        this.error = 'Username already taken'
      }
    )
  }
}
