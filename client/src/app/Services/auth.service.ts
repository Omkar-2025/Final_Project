import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

 userAuthSubject = new BehaviorSubject<string>("");
  userAuth = this.userAuthSubject.asObservable();
  isloggedInSubject = new BehaviorSubject<boolean>(false);
  isloggedIn = this.isloggedInSubject.asObservable();

  login(data:any) {
  return this.http.post('http://localhost:4000/api/user/login', data,{withCredentials:true});
  }

  signup(data:any) {
    return this.http.post('http://localhost:4000/api/user/createuser', data,{withCredentials:true});
  }

  verifyUser(data:any) {
    this.userAuth.subscribe((result:any)=>{
      data.email=result;
    })
    return this.http.post('http://localhost:4000/api/user/verifyUser', data,{withCredentials:true});
  }

  getUser(){
    return this.http.get('http://localhost:4000/api/user/getUser',{withCredentials:true});
  }

  updateUser(data:any){
    return this.http.post('http://localhost:4000/api/user/updateUser',data,{withCredentials:true});
  }
  updatePassword(data:any){
    return this.http.post('http://localhost:4000/api/user/updatePassword',data,{withCredentials:true});
  }

  updateUserPassword({oldPassword,newPassword}:{oldPassword:string,newPassword:string}){
    return this.http.post('http://localhost:4000/api/user/updatePassword',{oldPassword,newPassword}, {withCredentials:true});
  }

}
