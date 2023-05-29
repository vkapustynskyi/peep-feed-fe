
import {Observable, Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {PostCreationRequest} from "../_models/PostCreationRequest";
import {CommentCreationRequest} from "../_models/CommentCreationRequest";

@Injectable({providedIn: 'root'})
export class CommentService {

  public update$ = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  public commentPost(request: CommentCreationRequest): Observable<any> {
    return this.http.post("/comments", request)
      .pipe(tap(() => this.update$.next()));
  }
}
