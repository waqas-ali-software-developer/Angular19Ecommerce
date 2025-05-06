import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user_url = "http://localhost:3000/user/"
  constructor(private httpClient: HttpClient, private apiService: ApiService) { }

  //get individual data test

  getUserData(user_id: any)
  {
      return this.apiService.get(this.user_url + user_id);
  }

  //update data by id
  updateUserData(user_id: any, user_dto: any) : Observable<any>
  {
    return this.apiService.put(this.user_url + user_id, user_dto);
  }
}
