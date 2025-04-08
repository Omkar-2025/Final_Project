import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

 export class BillsService {
    constructor(private http:HttpClient) { }


    billsEndPoint:string = 'http://localhost:4000/api/bills/';

     getBills() {
        return this.http.get(`${this.billsEndPoint}/getbills`,{withCredentials:true});
    }

    paybills(billId:number,accountId:number){
        return this.http.post(`${this.billsEndPoint}/paybills`,{billId,accountId},{withCredentials:true});
    }

    createBill(billName:string,amount:number,frequency:string,accountId:string){
      console.log(accountId);
        return this.http.post(`${this.billsEndPoint}/createBill`,{billName,amount,frequency,accountId},{withCredentials:true});
    }

    getbillshistory(){
        return this.http.get(`${this.billsEndPoint}/getbillsTranscation`,{withCredentials:true});
      }    

      deleteBill(billId:number){
        return this.http.delete(`${this.billsEndPoint}/deleteBill`,{body:{billId},withCredentials:true});
      }

      updateBill(billId:number,billName:string,amount:number,frequency:string,accountId:string){
        console.log(billId,billName,amount,frequency,accountId);
        return this.http.put(`${this.billsEndPoint}/updateBill`,{billId,billName,amount,frequency,accountId},{withCredentials:true});
      }


} 