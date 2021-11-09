import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cnc',
  templateUrl: './cnc.component.html',
  styleUrls: ['./cnc.component.css']
})
export class CncComponent implements OnInit {

  status = 0; 

  constructor() { }

  ngOnInit(): void {
    this.status = Math.floor(Math.random() * 3);
    console.log(this.status);
  }

}
