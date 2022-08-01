import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  IsloggedIn(){
    return !!localStorage.getItem('token');
  }

  authUser(user: any) {
    let UserArray = [];
    if (localStorage.getItem('')){

    }
  }
}
