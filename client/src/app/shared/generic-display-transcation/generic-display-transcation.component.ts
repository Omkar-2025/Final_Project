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

  searchTerm: string = '';
  filteredKeys: string[] = [];

  ngOnInit() {
    this.keys = Object.keys(this.transaction);
    this.filteredKeys = [...this.keys];
    // console.log(this.keys);
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      
      this.filteredKeys = [...this.keys];
    } else {
      this.filteredKeys = this.keys.filter((key) =>
        key.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (this.transaction[key] && this.transaction[key].toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }

}
