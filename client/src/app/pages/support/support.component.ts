import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupportService } from '../../Services/support.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-support',
  standalone: false,
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {


  allSupportQuery:any=[]; 

  visible: boolean = false;

  btnName:string = 'Create Support Request';

  supportFormInputControls = [
    { name: 'subject', label: 'Subject', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' }
  ];



  constructor(private supportService:SupportService, private messageService:MessageService){}

  supportForm:FormGroup= new FormGroup({
    subject:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(5),Validators.maxLength(12)]),
    description:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(5),Validators.maxLength(50)]),
  })

  

  ngOnInit(){

    this.fetchingAllQuery();

  }



  fetchingAllQuery(){
    this.supportService.getSupportRequests().subscribe((result:any)=>{
      this.allSupportQuery=result.msg;
    },(err:any)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:err.error.msg});
    })
  }


  createSupport(value:any) {

    console.log(value);

    if (this.supportForm.valid) {
      const subject = this.supportForm.get('subject')?.value;
      const description = this.supportForm.get('description')?.value;
      this.supportService.sendSupportRequest(subject,description).subscribe((result:any)=>{
        this.messageService.add({severity:'success', summary:'Success', detail:'Support request sent successfully'});
        this.supportForm.reset();
        this.visible=false;
        this.fetchingAllQuery()
      },(error:any)=>{
        console.log(error);
        this.messageService.add({severity:'error', summary:'Error', detail:error.error.msg});
      })
    } else {
      console.log('Form is invalid');
      this.messageService.add({severity:'error',summary:'Error',detail:'Form is Invalid'})
    }
  }
 

  showDialog() {
    this.visible = true;
  }

  supportQueryDeleted(event:Event){
      this.fetchingAllQuery();
  }

}
