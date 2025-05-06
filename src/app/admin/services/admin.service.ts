import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public user_url = "http://localhost:3000/user/";
  public product_url = "http://localhost:3000/products/";
  public all_user = "http://localhost:3000/user";

  constructor(private apiService: ApiService) { }

  userDashboardData() {
    return this.apiService.get(this.user_url);
  }

  productDashboardData() {
    return this.apiService.get(this.product_url);
  }

  allUser(): Observable<any> {
    return this.apiService.get(this.all_user)
  }

  addUser(user_details: any) {
    return this.apiService.post(this.user_url, user_details);
  }

  //admin get data of  individual user
  singleUser(user_id: any) {
    return this.apiService.get(this.user_url+'?id='+ user_id);
  }

  //update data of individual user
  editUser(user_id: any, user_detail: any): Observable<any> {
    return this.apiService.put(this.user_url + user_id, user_detail);
  }

  //delete user
  deleteUser(user_id: any) {
    return this.apiService.delete(this.user_url + user_id);
  }
}
