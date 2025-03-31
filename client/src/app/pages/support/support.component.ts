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



  constructor(private supportService:SupportService, private messageService:MessageService){}

  supportForm:FormGroup= new FormGroup({
    subject:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
  })

  ngOnInit(){
    this.fetchingAllQuery();
  }

  allSupportQuery:any=[]; 


  fetchingAllQuery(){
    this.supportService.getSupportRequests().subscribe((result:any)=>{
      console.log(result);
      // this.supportQuery=result[0].support;
      this.allSupportQuery=result.msg;
    },(err:any)=>{
      console.log(err);
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to fetch support requests'});
    })
  }


  createSupport() {
    if (this.supportForm.valid) {
      const subject = this.supportForm.get('subject')?.value;
      const description = this.supportForm.get('description')?.value;
     // console.log(subject, description);
      this.supportService.sendSupportRequest(subject,description).subscribe((result:any)=>{
        this.messageService.add({severity:'success', summary:'Success', detail:'Support request sent successfully'});
        this.supportForm.reset();
        this.visible=false;
        this.fetchingAllQuery()

      },(error:any)=>{
        console.log(error);
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to send support request'});
      })
    } else {
      console.log('Form is invalid');
    }
  }
  visible: any;
  showDialog() {
    this.visible = true;
  }

  supportQueryDeleted(event:Event){
      this.fetchingAllQuery();
  }

}
