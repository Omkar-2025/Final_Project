import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn:'root'
})

export class AdminService {

    constructor(private http:HttpClient){}

     getAllSupports(){
        return this.http.get('http://localhost:4000/api/admin/getAllSupport',{withCredentials:true});
    }

    resolveQuery(id:string, reply:string){
        return this.http.put(`http://localhost:4000/api/admin/resolveQuery/${id}`,{reply},{withCredentials:true});
    }

    getAllUsers(){
        return this.http.get('http://localhost:4000/api/admin/getAllUsers',{withCredentials:true});
    }

    getAllAccounts(){
        return this.http.get('http://localhost:4000/api/admin/getAllAccounts',{withCredentials:true});
    }

    verifyAccount(id:number){
        return this.http.put(`http://localhost:4000/api/admin/verifyAccount/${id}`,{}, {withCredentials:true});
    }

    getAccountByUserId(id:number){
        return this.http.get(`http://localhost:4000/api/admin/getAccountByUserId/${id}`,{withCredentials:true});
    }

    getQueryById(id:number){
        return this.http.get(`http://localhost:4000/api/admin/getSupportById/${id}`,{withCredentials:true});
    }

}