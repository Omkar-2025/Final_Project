import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-display-transcation',
  standalone: false,
  templateUrl: './generic-display-transcation.component.html',
  styleUrl: './generic-display-transcation.component.css'
})
export class GenericDisplayTranscationComponent implements OnInit {
  @Input() transaction: any;

  keys:any[]=[];

  ngOnInit() {
    this.keys = Object.keys(this.transaction);
    // console.log(this.keys);
  }

}
