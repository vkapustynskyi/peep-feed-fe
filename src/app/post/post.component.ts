import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/AuthenticationService";
import {SnackbarService} from "../_services/snackbar.service";
import {PostDto} from "../_models/PostDto";
import {PostService} from "../_services/PostService";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: PostDto;
  @Input() showLike: boolean = true;
  @Input() showShare: boolean = true;
  @Input() showDelete: boolean = false;
  @Input() showApprove: boolean = false;
  @Input() showDecline: boolean = false;
  constructor(
              private snackbarService: SnackbarService,
              public authService: AuthenticationService,
              private postService: PostService) {
  }

  ngOnInit(): void {
  }

  public toggleLike(post: PostDto): boolean {
    console.log(post.id);
    console.log(post.isLiked);
    if (post.isLiked) {
      post.isLiked = false;
    } else {
      post.isLiked = true;
    }
    this.snackbarService.showSuccessSnackBar();
    return this.post.isLiked;
  }

  deletePost(id: number) {
    this.postService.delete(id)
      .subscribe(() => {
        window.location.reload();
        this.snackbarService.showSuccessSnackBar();
      });
  }

  protected readonly window = window;

  approve(id: number) {
    this.postService.approvePost(id)
      .subscribe(() => {
        window.location.reload();
        this.snackbarService.showSuccessSnackBar();
      })
  }

  decline(id: number) {
    this.postService.declinePost(id)
      .subscribe(() => {
        window.location.reload();
        this.snackbarService.showSuccessSnackBar();
      })
  }
}
