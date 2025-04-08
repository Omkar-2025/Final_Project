import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
 


 


  visible: boolean = false;

  userData: any = {};


  updateUserInfoForm!: FormGroup;

  updateUserPasswordForm: FormGroup;

  btnProfileName: string = 'Update Profile';

  updateInfoControls = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
    {name:'phone',label:'Phone',type:'number' },
    {name:'address',label:'Address',type:'text'}
  ]

  updatePasswordControls=[
    { name: 'oldPassword', label: 'Old Password', type: 'password' },
    { name: 'newPassword', label: 'New Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' }
  ]

  constructor(private authService: AuthService, private messageService: MessageService, private accountService: AccountService) {

    this.updateUserInfoForm = new FormGroup({
      name: new FormControl(this.userData.name, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      email: new FormControl(this.userData.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.userData.phone, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      address: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    })

    this.updateUserPasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    })

  }


  fetchUserInfo() {
    this.authService.getUser().subscribe((result: any) => {
      this.userData = result.msg;

      this.updateUserInfoForm.patchValue({
        name: this.userData.name,
        email: this.userData.email,
        phone: this.userData.phone,
        address: this.userData.address
      })
      
    }, (err: any) => {
      console.log(err);
    })
  }


  fetchExpnensePdf() {
    this.accountService.getExpensePdf().subscribe((result) => {
      console.log(result);
    }, (err: any) => {
      console.log(err);
    })
  }


  downloadExpense() {
    this.fetchExpnensePdf();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Expense PDF Downloaded' })
  }


  ngOnInit() {
    this.fetchUserInfo();
  }


  updateProfileDialog() {
    this.visible = true;
  }

  updatePasswordVisible: boolean = false;
  updatePasswordDialog() {
    this.updatePasswordVisible = true;
  }

  updateUserInfo(updateUserValue: { name: string, email: string, phone: string, address: string }) {
    // console.log($event);
    
    if (updateUserValue.name == '' || updateUserValue.email == '' || updateUserValue.phone == '' || updateUserValue.address == '') {
      // console.log('Form is invalid');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Form is Invalid' })
      return;
    }
    const updatedUserData = { ...updateUserValue, password: '', confirmPassword: '' };
    this.authService.updateUser(updatedUserData).subscribe((result: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: result.msg })
      this.visible = false;
      this.fetchUserInfo();
    }, (error: any) => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.msg })
    })
  }


  updatePassword(updatePasswordValue:{oldPassword:string,newPassword:string,confirmPassword:string}) {
    if (updatePasswordValue.oldPassword == '' || updatePasswordValue.newPassword == '' || updatePasswordValue.confirmPassword == '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Form is Invalid' })
      return;
    }
    if (updatePasswordValue.newPassword != updatePasswordValue.confirmPassword) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'New Password and Confirm Password do not match' })
      return;
    }
    this.authService.updateUserPassword(updatePasswordValue).subscribe((result: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: result.msg })
      this.updatePasswordVisible = false;
    }, (error: any) => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.msg })
    })
  }

}
