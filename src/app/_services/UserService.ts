import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserCreationRequest} from "../_models/UserCreationRequest";
import {Observable} from "rxjs";
import {MyProfileDto} from "../_models/MyProfileDto";
import {MainUserDto} from "../_models/MainUserDto";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public createProfile(request: UserCreationRequest): Observable<any> {
    return this.http.post("/users", request);
  }

  public getMyProfile(): Observable<MyProfileDto> {
    return this.http.get<MyProfileDto>("/users/profile");
  }

  public getAllUsers(): Observable<MainUserDto[]> {
    return this.http.get<MainUserDto[]>("/users");
  }

  public toggleUserEnable(id: number): Observable<any> {
    return this.http.patch(`/users/${id}/enable`, null);
  }
}
