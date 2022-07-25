import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'category', 'freshness', 'date','price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private api: ApiService, private notifier: NotifierService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct() {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          // this.notifier.showSnackBar('getProduct is okay', 'done', 'success')
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          // alert ('co loi roi')
          this.notifier.showSnackBar('There was an error', 'dismiss', 'error')
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  // hàm sửa
  editProduct(row: any){
    this.dialog.open(DialogComponent, {
      width: '35%',
      data: row,
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllProduct()
      }
    })
  }

// hàm xóa
  deleteProduct(id: number){
    this.api.deleteProduct(id)
    .subscribe({
      next: (res) => {
        this.notifier.showSnackBar('Product Delete', 'oke', 'success')
        this.getAllProduct()
      },
      error: () => {
        this.notifier.showSnackBar('There was an error', 'oke', 'error')
      }
    })
  }
}
