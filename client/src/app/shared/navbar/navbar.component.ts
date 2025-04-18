import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  isloggedIn:boolean=false;
  role :string = '';

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.authService.isloggedIn.subscribe((result:any)=>{
      this.isloggedIn=result;
    })
    this.role = localStorage.getItem('role') || '';
    console.log(this.role);
    
  }
  userLogout() {
    localStorage.removeItem('token');  
  }

  logOutUser(){

    this.authService.logout().subscribe((result:any)=>{
      this.authService.userRole.next('');
      this.authService.isloggedInSubject.next(false);
      this.router.navigate(['/login']);
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.router.navigate(['/login'])
    })
    localStorage.removeItem('role');
  }


}
