import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class SupportService {
    constructor(private http:HttpClient) { }


   
    sendSupportRequest(subject: string, description: string) {
      return this.http.post('http://localhost:4000/api/support/query', {subject, description}, {withCredentials:true})}

        
    getSupportRequests() {
      return this.http.get('http://localhost:4000/api/support/query/all', {withCredentials:true})  
    }

    deleteSupportRequest(id: string) {
      return this.http.delete(`http://localhost:4000/api/support/query/${id}`, {withCredentials:true})  
    } 
     
      
}