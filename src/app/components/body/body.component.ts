import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NotifierService } from 'src/app/services/notifier.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyComponent implements OnInit {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  displayedColumns: string[] = ['Product Name', 'Category', 'Freshness',  "name User",'Date', 'Price', 'Comment', 'Edit'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private login:AuthService,
    private breakpointObserver: BreakpointObserver,
    private api: ApiService,
    private notifier: NotifierService,
    private dialog: MatDialog) { }

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
          this.notifier.showSnackBar('There was an error', 'dismiss', 'error')
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllProduct()
      }
    })
  }
  // hàm sửa
  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.notifier.showSnackBar('Product Update', 'oke', 'success')
        this.getAllProduct()
      }
    })
  }

  // hàm xóa
  deleteProduct(id: number) {
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
//hàm đăng xuất
  logout() {
    localStorage.clear();
    this.router.navigate(['login'])}


}
