import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  isloggedIn:boolean=false;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    localStorage.getItem('token')?this.isloggedIn=true:this.isloggedIn=false;
  }
  userLogout() {
    localStorage.removeItem('token');  
  }

}
