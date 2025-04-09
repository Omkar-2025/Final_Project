import { Injectable } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguradService implements CanActivate {

  currUser:any;
  loggedIn:any;

  constructor(private authService:AuthService , private router:Router) {
      this.authService.userRoleObservable.subscribe((result:any)=>{
        this.currUser=result;
      })
      this.authService.isloggedIn.subscribe((result:any)=>{
        this.loggedIn=result;
      })
  }

  canActivate():boolean{
    const role = localStorage.getItem('role');
    if(role && this.loggedIn){
      return true;
    }
    // console.log(this.currUser);
    this.router.navigate(['/login'])
    return false;
  }

}
