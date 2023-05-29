import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {PostCreationRequest} from "../_models/PostCreationRequest";

@Injectable({providedIn: 'root'})
export class PostService {

  constructor(private http: HttpClient) {
  }

  public post(request: PostCreationRequest): Observable<any> {
    return this.http.post("/posts", request);
  }

  public getMyPosts() {
    return this.http.get("/posts/my");
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`/posts/${id}`);
  }
}
