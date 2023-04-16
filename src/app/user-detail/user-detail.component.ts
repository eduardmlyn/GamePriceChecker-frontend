import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  username: string | null
  newName: string = ""
  isEditing: boolean = false
  error: boolean = false
  deleteError: boolean = false

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this.username = this._authService.getCurrentUserName()
  }

  toggleEdit() {
    this.isEditing = !this.isEditing
  }

  onSaveClick(newName?: string) {
    if (newName && newName != this.username) {
      this._userService.editUsername(newName).subscribe(res => {
        if (!res) {
          this.error = true
        } else {
          this.username = newName
          this.toggleEdit()
        }
      })
    }
  }

  onDeleteClick() {
    this._userService.deleteUser().subscribe(res => {
      if (!res) {
        this.deleteError = true
      } else {
        this._router.navigate(['games'])
      }
    })
  }
}
