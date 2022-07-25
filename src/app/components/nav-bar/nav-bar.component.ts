import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { BodyComponent } from '../body/body.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  // constructor(private dialog: MatDialog, private getAllProduct: BodyComponent , private api: ApiService) { }
  constructor(private dialog: MatDialog,){}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '35%'
    })
    // .afterClosed().subscribe(val => {
    //   if(val === 'save'){
    //     this.getAllProduct()
    //   }
    // })
  }


  ngOnInit(): void {
  }

}
