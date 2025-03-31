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

}