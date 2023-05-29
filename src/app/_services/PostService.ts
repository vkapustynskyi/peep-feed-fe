import {Observable, Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {PostCreationRequest} from "../_models/PostCreationRequest";

@Injectable({providedIn: 'root'})
export class PostService {

  public update$ = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  public post(request: PostCreationRequest): Observable<any> {
    return this.http.post("/posts", request)
      .pipe(tap(() => this.update$.next()));
  }

  public getMyPosts() {
    return this.http.get("/posts/my");
  }

  public getFeedPosts() {
    return this.http.get("/posts");
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`/posts/${id}`);
  }

  public getPostsToModerate() {
    return this.http.get("/posts/moderation");
  }

  public approvePost(id: number) {
    return this.http.patch(`/posts/${id}`, null);
  }

  public declinePost(id: number) {
    return this.http.patch(`/posts/${id}/decline`, null);
  }
}
