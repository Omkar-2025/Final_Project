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
  userRole = new BehaviorSubject<string>('');
  userRoleObservable = this.userRole.asObservable();

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
    },(error)=>{
      console.log(error);
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

  forgetOtp(email:string,otp:string){
    return this.http.post(`${this.loginEndPoint}/forgetOtp`, { email,otp }, { withCredentials: true });
  }

  forgetPassword(data: any) {
    
    return this.http.post(`${this.loginEndPoint}/verifyForgetOtp`, data, { withCredentials: true });
  }

  logout(){
    return this.http.get(`${this.loginEndPoint}/logout`, { withCredentials: true });
  }

  resendOtp(data:any){
    // console.log(data);
    
    return this.http.post(`${this.loginEndPoint}/generateOtp`, data, { withCredentials: true });  
  }


}
