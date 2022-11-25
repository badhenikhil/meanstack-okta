import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { constants } from './constants/constant';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(loginDetail: any) {
    return this.http.post(constants.loginUrl, loginDetail, {
      observe: 'body',
    });
  }

  register(userDetail: any) {
    return this.http.post(constants.registerUrl, userDetail, {
      observe: 'body',
    });
  }
  getUsers() {
    const token: any = localStorage.getItem('token');
    return this.http.get(constants.usersUrl, {
      observe: 'body',
      params: new HttpParams().append('token', token),
    });
  }
  logout() {
    return this.http.get(constants.logoutUrl, {
      observe: 'body',
      withCredentials: true,
    });
  }
}
