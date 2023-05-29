import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/AuthenticationService";
import {MyProfileDto} from "../_models/MyProfileDto";
import {UserService} from "../_services/UserService";
import {PostService} from "../_services/PostService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostCreationRequest} from "../_models/PostCreationRequest";
import {SnackbarService} from "../_services/snackbar.service";
import {PostDto} from "../_models/PostDto";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public profile: MyProfileDto;
  public postForm!: FormGroup;

  public posts: PostDto[];

  constructor(private userService: UserService,
              public authenticationService: AuthenticationService,
              private postService: PostService,
              private formBuilder: FormBuilder,
              private snack: SnackbarService) {
  }

  ngOnInit(): void {
    this.userService.getMyProfile().subscribe(
      (profile: MyProfileDto) => {
        this.profile = profile;
        localStorage.setItem("user", JSON.stringify(profile));
      });
    this.postForm = this.formBuilder.group({
      content: ['', Validators.required],
    });
    this.postService.getMyPosts().subscribe(
      (posts: PostDto[]) => {
        this.posts = posts
      }
    );
  }

  post() {
    if (this.postForm.get('content').value) {
      const request: PostCreationRequest = {
        value: this.postForm.get('content').value
      }
      this.postService.post(request).subscribe(
        () => {
          window.location.reload();
          this.snack.showSuccessSnackBar();
        });
    }
  }
}
