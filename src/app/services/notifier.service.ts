import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '../components/notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor( private _snackBar: MatSnackBar) { }

  showSnackBar(message: string, button: string, messageType: 'error'| 'success') {
    this._snackBar.openFromComponent(NotifierComponent,{
      data:{
        message : message,
        button : button,
        type : messageType,
      },
      duration:2500,
      horizontalPosition:'right',
      verticalPosition: 'top',
      panelClass: messageType
    });
  }
}
