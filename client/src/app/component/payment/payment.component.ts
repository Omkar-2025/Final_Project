import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    @Input() transcations: any;
    // @Input() account_info: any;

    ngOnInit() {
      
    }
}
