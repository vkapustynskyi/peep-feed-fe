import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/AuthenticationService";
import {UserService} from "../_services/UserService";
import {PostDto} from "../_models/PostDto";
import {PostService} from "../_services/PostService";
import {SnackbarService} from "../_services/snackbar.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  @Input() posts: PostDto[];

  constructor(public authService: AuthenticationService,
              public userService: UserService,
              private postService: PostService,
              private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.postService.getPostsToModerate()
      .subscribe((posts: PostDto[]) => {
        this.posts = posts;
        this.snackbar.showSuccessSnackBar();
      })
  }

}
