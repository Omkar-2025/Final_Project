import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { loginInterface, registerInterface } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  userAuthSubject = new BehaviorSubject<string>("");
  userAuth = this.userAuthSubject.asObservable();
  isloggedInSubject = new BehaviorSubject<boolean>(false);
  isloggedIn = this.isloggedInSubject.asObservable();


  loginEndPoint: string = 'http://localhost:4000/api/user'



  /**
   * * @param data - login data
   * * @returns - login response
   * * @description - This function is used to login the user
   */


  login(data: loginInterface) {
    return this.http.post(`${this.loginEndPoint}/login`, data, { withCredentials: true });
  }

  signup(data: registerInterface) {
    return this.http.post(`${this.loginEndPoint}/createuser`, data, { withCredentials: true });
  }

  verifyUser(data: any) {
    this.userAuth.subscribe((result: any) => {
      data.email = result;
    })
    return this.http.post(`${this.loginEndPoint}/verifyUser`, data, { withCredentials: true });
  }

  getUser() {
    return this.http.get(`${this.loginEndPoint}/getUser`, { withCredentials: true });
  }

  updateUser(data: registerInterface) {
    return this.http.post(`${this.loginEndPoint}/updateUser`, data, { withCredentials: true });
  }



  updateUserPassword({ oldPassword, newPassword }: { oldPassword: string, newPassword: string }) {
    return this.http.post(`${this.loginEndPoint}/updatePassword`, { oldPassword, newPassword }, { withCredentials: true });
  }

}
