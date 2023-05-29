import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/AuthenticationService";
import {UserService} from "../_services/UserService";
import {PostDto} from "../_models/PostDto";
import {PostService} from "../_services/PostService";
import {SnackbarService} from "../_services/snackbar.service";
import {MainUserDto} from "../_models/MainUserDto";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  posts: PostDto[];
  users: MainUserDto[];

  constructor(public authService: AuthenticationService,
              private userService: UserService,
              private postService: PostService,
              private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.postService.getPostsToModerate()
      .subscribe((posts: PostDto[]) => {
        this.posts = posts;
        this.snackbar.showSuccessSnackBar();
      });
    this.userService.getAllUsers()
      .subscribe((users: MainUserDto[]) => {
        this.users = users;
        this.snackbar.showSuccessSnackBar();
      })
  }

  toggleUserEnable(user: MainUserDto) {
    this.userService.toggleUserEnable(user.id)
      .subscribe(() => {
        user.isEnabled = !user.isEnabled
        this.snackbar.showSuccessSnackBar();
      });

  }
}
