import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/AuthenticationService";
import {SnackbarService} from "../_services/snackbar.service";
import {PostDto} from "../_models/PostDto";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: PostDto;
  @Input() showIcon: boolean = true;
  constructor(
              private snackbarService: SnackbarService,
              public authService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  public toggleLike(product: PostDto): boolean {
    console.log(product.uuid);
    console.log(product.isFavourite);
    if (product.isFavourite) {

      product.isFavourite = false;
    } else {

    }
    this.snackbarService.showSuccessSnackBar();
    return this.post.isFavourite;
  }

}
