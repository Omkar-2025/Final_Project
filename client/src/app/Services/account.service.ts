import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  accountEndPoint:string = 'http://localhost:4000/api/account/'


    getAllaccounts(){
        return this.http.get('http://localhost:4000/api/user/getAllAccounts',{withCredentials:true});
    }

    getaccountById(id:number){
        return this.http.get(`${this.accountEndPoint}/getAccount/${id}`,{withCredentials:true});
    }

    getTransactionsByAccount(id:number,page:number=1){
        return this.http.post(`${this.accountEndPoint}/getTransactions/${id}`,{page},{withCredentials:true});
    }

    depositAmount(accountId:number,amount:number){
      return this.http.post(`${this.accountEndPoint}/deposit`,{accountId,amount},{withCredentials:true});
    }

    withdrawAmount(accountId:number,amount:number){
      return this.http.post(`${this.accountEndPoint}/withdraw`,{accountId,amount},{withCredentials:true});
    }

    transferAmount(fromAccount:number,toAccount:string,amount:number,transcationType:string){   
      return this.http.post(`${this.accountEndPoint}/createTransaction`,{fromAccount,toAccount,amount,transcationType},{withCredentials:true});
    }

    createAccount(name:string,balance:number,account_type:string,aadhar_card_number:string,pan_card_number:string){
      return this.http.post(`${this.accountEndPoint}/createAccount`,{name,balance,account_type,aadhar_card_number,pan_card_number},{withCredentials:true});
    }

    getAllBankAccounts(){
      return this.http.get(`${this.accountEndPoint}/allAccounts`,{withCredentials:true});
    }


    getAllMonthlyExpense(id:number){
      return this.http.post(`${this.accountEndPoint}/getMonthlyAllExpenses/`,{id},{withCredentials:true});
    }


    getExpensePdf(){
      return this.http.get(`${this.accountEndPoint}/getExpensepdf`,{withCredentials:true,responseType:'blob'});
    }

    deactivateAccount(id:number){
      return this.http.post(`${this.accountEndPoint}/deactivateAccount`,{id},{withCredentials:true});
    }

    activateAccount(id:number){
      return this.http.post(`${this.accountEndPoint}/activateAccount`,{id},{withCredentials:true});
    }

}
