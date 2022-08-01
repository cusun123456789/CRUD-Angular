
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { DialogComponent } from '../dialog/dialog.component';
import { SingupComponent } from '../singup/singup.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  displayedColumns: string[] = ['UserName','Password', 'BirthDate', 'Gender', 'Email', 'phoneNumber','Edit'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getAllUser()
  }

  getAllUser() {

    this.api.getUser()
      .subscribe({
        next: (res): void => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          this.notifier.showSnackBar('There was an error', 'dismiss', 'error')
        }
      })
  };
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editUser(row: any) {
    this.dialog.open(SingupComponent, {
      width: '120%',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllUser()
      }
    })
  }


}
