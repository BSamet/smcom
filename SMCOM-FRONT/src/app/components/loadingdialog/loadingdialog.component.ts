import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-loadingdialog',
  templateUrl: './loadingdialog.component.html',
  styleUrls: ['./loadingdialog.component.css']
})
export class LoadingdialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoadingdialogComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}


  ngOnInit(): void {
  }


}
