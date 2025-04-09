import { ErrorHandler, Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable({
    providedIn:'root'
})

export class globalErrorHandler implements ErrorHandler{

    constructor(private router:Router){}
 
  handleError(error: any): void {
    console.error('An error occurred:', error);
   
    Swal.fire({
      title: 'Oops!',
      text: 'Something went wrong. Please try again later !',
      icon: 'error',
      confirmButtonText: 'OK'
    });
 
    this.router.navigate(['/home']);
  }

}