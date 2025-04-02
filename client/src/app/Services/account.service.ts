import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }


    getAllaccounts(){
        return this.http.get('http://localhost:4000/api/user/getAllAccounts',{withCredentials:true});
    }

    getaccountById(id:number){
        return this.http.get(`http://localhost:4000/api/account/getAccount/${id}`,{withCredentials:true});
    }

    getTransactionsByAccount(id:number){
        return this.http.get(`http://localhost:4000/api/account/getTransactions/${id}`,{withCredentials:true});
    }

    depositAmount(accountId:number,amount:number){
      return this.http.post(`http://localhost:4000/api/account/deposit`,{accountId,amount},{withCredentials:true});
    }

    withdrawAmount(accountId:number,amount:number){
      return this.http.post(`http://localhost:4000/api/account/withdraw`,{accountId,amount},{withCredentials:true});
    }

    transferAmount(fromAccount:number,toAccount:string,amount:number,transcationType:string){   
      return this.http.post(`http://localhost:4000/api/account/createTransaction`,{fromAccount,toAccount,amount,transcationType},{withCredentials:true});
    }

    createAccount(name:string,balance:number,account_type:string){
      return this.http.post(`http://localhost:4000/api/account/createAccount`,{name,balance,account_type},{withCredentials:true});
    }


    getAllBankAccounts(){
      return this.http.get('http://localhost:4000/api/account/allAccounts',{withCredentials:true});
    }


    getAllMonthlyExpense(id:number){
      return this.http.get(`http://localhost:4000/api/account/getMonthlyAllExpenses/${id}`,{withCredentials:true});
    }



}
