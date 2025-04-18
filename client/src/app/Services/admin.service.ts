import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn:'root'
})

export class AdminService {

    constructor(private http:HttpClient){}

    adminEndPoint:string= 'http://localhost:4000/api/admin/'

     getAllSupports(){
        // console.log("hii");
        return this.http.get(`${this.adminEndPoint}/getAllSupport`,{withCredentials:true});
    }

    resolveQuery(id:string, reply:string){
        return this.http.put(`${this.adminEndPoint}/resolveQuery/${id}`,{reply},{withCredentials:true});
    }

    getAllUsers(){
        return this.http.get(`${this.adminEndPoint}/getAllUsers`,{withCredentials:true});
    }

    getAllAccounts(){
        return this.http.get(`${this.adminEndPoint}/getAllAccounts`,{withCredentials:true});
    }

    verifyAccount(id:number){
        return this.http.put(`${this.adminEndPoint}/verifyAccount/${id}`,{}, {withCredentials:true});
    }

    getAccountByUserId(id:number){
        return this.http.get(`${this.adminEndPoint}/getAccountByUserId/${id}`,{withCredentials:true});
    }

    getQueryById(id:number){
        return this.http.get(`${this.adminEndPoint}/getSupportById/${id}`,{withCredentials:true});
    }

    getAllExpenses(){
        return this.http.get(`${this.adminEndPoint}/getAllExpenses`,{withCredentials:true});
    }

}