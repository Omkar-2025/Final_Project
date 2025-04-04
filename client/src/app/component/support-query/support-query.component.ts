import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SupportService } from '../../Services/support.service';
import {AdminService} from '../../Services/admin.service';
@Component({
  selector: 'app-support-query',
  standalone: false,
  templateUrl: './support-query.component.html',
  styleUrl: './support-query.component.css'
})
export class SupportQueryComponent {


  @Input() supportQuery: any;

  @Output() issupportQueryUpdated = new EventEmitter<any>();
  @Output() issupportQueryDeleted = new EventEmitter<any>();

  visible: any;

  role: string =  '';
  reply:string = '';

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private supportService: SupportService,
    private adminService:AdminService
  ) { }

  showDialog() {
    this.visible = true;
    // console.log(this.role);
    console.log("this.supportQuery", this.supportQuery);
    // console.log(this.visible);
    
  }

  ngOnInit() {
    this.role = localStorage.getItem('role')!;
  }


  // onHide() {
  //   this.visible = false;
  //   this.reply = '';
  // }


  confirm2(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.supportService.deleteSupportRequest(this.supportQuery.id).subscribe((result: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Support query deleted successfully' });
          this.issupportQueryDeleted.emit(this.supportQuery.id);
          this.issupportQueryUpdated.emit(this.supportQuery.id);
        }, (error: any) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting support query' });
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        this.visible = false;
      },
    }); 
  }
  sendResponse(){
      this.adminService.resolveQuery(this.supportQuery.id,this.reply).subscribe((res:any)=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: res.msg, life: 3000});
        this.visible=false;
        this.reply='';
        this.issupportQueryUpdated.emit(this.supportQuery.id);
        this.issupportQueryDeleted.emit(this.supportQuery.id);
      },( err:any )=>{
        console.log(err.error.msg);
        this.messageService.add({severity:'error', summary: 'Error', detail: err.error.msg, life: 3000});
      })
  }
}

