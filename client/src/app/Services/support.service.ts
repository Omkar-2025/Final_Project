import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class SupportService {
    constructor(private http:HttpClient) { }

     supportEndpoint:string = 'http://localhost:4000/api/support/';
   
    sendSupportRequest(subject: string, description: string) {
      return this.http.post(`${this.supportEndpoint}/query`, {subject, description}, {withCredentials:true})}

        
    getSupportRequests() {
      return this.http.get(`${this.supportEndpoint}/query/all`, {withCredentials:true})  
    }

    updateSupportRequest(id: string, subject: string, description: string) {
      return this.http.put(`${this.supportEndpoint}/query/${id}`, {subject, description}, {withCredentials:true})
    }

    deleteSupportRequest(id: string) {
      return this.http.delete(`${this.supportEndpoint}/query/${id}`, {withCredentials:true})  
    } 
     
      
}