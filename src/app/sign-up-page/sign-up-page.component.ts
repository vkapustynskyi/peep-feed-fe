import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/UserService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SnackbarService, SnackbarTypes} from "../_services/snackbar.service";
import {AuthenticationService} from "../_services/AuthenticationService";
import {Router} from "@angular/router";
import {navigationRoutes} from "../navigationRoutes";
import {UserCreationRequest} from "../_models/UserCreationRequest";
import {first} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['../login-page/login-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  signUpForm!: FormGroup;
  loading = false;
  submitted = false;
  confirmPasswordMatched = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private snack: SnackbarService) {
  }

  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate([navigationRoutes.myProfile]);
    }
    this.signUpForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  signUp() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      this.snack.showErrorSnackBar("All fields are required")
      return;
    }
    if (!this.checkPasswordMatch()) {
      this.snack.showErrorSnackBar("\"Confirm password\" field should match with \"Password\" field")
      return;
    }
    this.toggleLoading();
    const request: UserCreationRequest = {
      firstName: this.signUpForm.get('firstName').value,
      lastName: this.signUpForm.get('lastName').value,
      nickname: this.signUpForm.get('nickname').value,
      birthday: this.signUpForm.get('birthday').value,
      password: this.signUpForm.get('password').value,
    }
    this.userService.createProfile(request)
      .pipe(first())
      .subscribe({
        next: () => {
          this.snack.showSuccessSnackBar();
          this.router.navigate([navigationRoutes.auth]);
        },
        error: error => {
          this.snack.showSnackbar(SnackbarTypes.error, error, 4000);
          this.loading = false;
        }
      });
    this.toggleLoading();
  }

  checkPasswordMatch() {
    let password = this.signUpForm.get("password").value;
    let confirmPassword = this.signUpForm.get("confirmPassword").value;
    this.confirmPasswordMatched = password === confirmPassword;
    console.log("checking", password, confirmPassword);
    return this.confirmPasswordMatched;
  }

  private toggleLoading() {
    this.loading = !this.loading;
  }
}
