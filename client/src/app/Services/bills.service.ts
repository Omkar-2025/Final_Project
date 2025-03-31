import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

 export class BillsService {
    constructor(private http:HttpClient) { }

     getBills() {
        return this.http.get('http://localhost:4000/api/bills/getbills',{withCredentials:true});
    }

    paybills(billId:number,accountId:number){
        return this.http.post('http://localhost:4000/api/bills/paybills',{billId,accountId},{withCredentials:true});
    }

    createBill(billName:string,amount:number,frequency:string,accountId:string){
        return this.http.post('http://localhost:4000/api/bills/createBill',{billName,amount,frequency,accountId},{withCredentials:true});
    }

    getbillshistory(){
        return this.http.get('http://localhost:4000/api/bills/getbillsTranscation',{withCredentials:true});
      }    

      deleteBill(billId:number){
        return this.http.delete('http://localhost:4000/api/bills/deleteBill',{body:{billId},withCredentials:true});
      }

      updateBill(billId:number,billName:string,amount:number,frequency:string,accountId:string){
        console.log(billId,billName,amount,frequency,accountId);
        return this.http.put('http://localhost:4000/api/bills/updateBill',{billId,billName,amount,frequency,accountId},{withCredentials:true});
      }


} 