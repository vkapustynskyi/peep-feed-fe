import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/AuthenticationService";
import {SnackbarService} from "../_services/snackbar.service";
import {PostDto} from "../_models/PostDto";
import {PostService} from "../_services/PostService";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommentCreationRequest} from "../_models/CommentCreationRequest";
import {CommentService} from "../_services/CommentService";
import {CommentDto} from "../_models/CommentDto";
import {repeatWhen} from "rxjs";

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
  showCommentArea: boolean = false;
  commentForm!: FormGroup;
  comments: CommentDto[];

  constructor(
              private snackbarService: SnackbarService,
              public authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private commentService: CommentService,
              private postService: PostService) {
  }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: ['']
    });
    this.commentService.getComments(this.post.id)
      .pipe(repeatWhen(() => this.commentService.update$))
      .subscribe((comments: CommentDto[]) => {
        this.comments = comments;
      })
  }

  public toggleLike(post: PostDto): boolean {
    console.log(post.id);
    console.log(post.isLiked);

    if (post.isLiked) {
      this.postService.unlike(post.id)
        .subscribe(() => {
          post.isLiked = false;
        });
    } else {
      this.postService.like(post.id)
        .subscribe(() => {
        post.isLiked = true;
      });
    }
    this.snackbarService.showSuccessSnackBar();
    return this.post.isLiked;
  }

  deletePost(id: number) {
    this.postService.delete(id)
      .subscribe(() => {
        this.snackbarService.showSuccessSnackBar();
      });
  }

  protected readonly window = window;

  approve(id: number) {
    this.postService.approvePost(id)
      .subscribe(() => {
        this.snackbarService.showSuccessSnackBar();
      })
  }

  decline(id: number) {
    this.postService.declinePost(id)
      .subscribe(() => {
        this.snackbarService.showSuccessSnackBar();
      })
  }

  toggleComment() {
    this.showCommentArea = !this.showCommentArea;
  }

  commentPost(postId: number) {
    let comment = this.commentForm.get('comment').value;
    if (comment?.trim()) {
      console.log(postId, comment);
    }
    const request: CommentCreationRequest = {
      postId: postId,
      comment: comment
    }
    this.commentService.commentPost(request)
      .subscribe(() => {
        this.snackbarService.showSuccessSnackBar();
        this.commentForm.get('comment').reset();
      })
  }
}
