import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/UserService";
import {Router} from "@angular/router";
import {AuthenticationService} from "../_services/AuthenticationService";
import {SnackbarService, SnackbarTypes} from "../_services/snackbar.service";
import {first} from "rxjs";
import {navigationRoutes} from "../navigationRoutes";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private snack: SnackbarService) {
  }

  ngOnInit(): void {
    console.log("isAuthenticated: ", this.authenticationService.isAuthenticated());
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate([navigationRoutes.myProfile]);
    }
    this.loginForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log()
    this.authenticationService.login(this.loginForm.get('nickname').value, this.loginForm.get('password').value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.snack.showSuccessSnackBar();
          this.router.navigate([navigationRoutes.myProfile]);
        },
        error: error => this.snack.showSnackbar(SnackbarTypes.error, error, 4000)
      });
  }
}
