import {Component, OnInit} from '@angular/core';
import {PostDto} from "../_models/PostDto";
import {PostService} from "../_services/PostService";
import {SnackbarService} from "../_services/snackbar.service";
import {AuthenticationService} from "../_services/AuthenticationService";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts: PostDto[];

  constructor(private postService: PostService,
              private snackbarService: SnackbarService,
              public authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.postService.getFeedPosts()
      .subscribe((posts: PostDto[]) => {
        this.posts = posts;
        this.snackbarService.showSuccessSnackBar();
      })
  }

}
