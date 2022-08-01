import { HttpClient } from '@angular/common/http';
import { Component, OnInit,} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notifier.service';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private notifier: NotifierService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {


    this.loginForm = this.formBuilder.group({
      userName: ['',
        [ Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ]],
      password: ['',
        [ Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]],
    })
  }
  get userName() {
    return this.loginForm.get('userName')
  }
  get password() {
    return this.loginForm.get('password')
  }

  login(){
    this.api.getUser()
    .subscribe({
      next: (res) =>{
        const user = res.find((a : any) => {
          return a.userName === this.loginForm.value.userName && a.password === this.loginForm.value.password
        });
        if (user) {
          localStorage.setItem('token', 'daylatokennhungkolaydc');
          this.loginForm.value.userName == 'quyet' ? localStorage.setItem('UserType','Admin' ) : localStorage.setItem('UserType','empjloye')
          this.notifier.showSnackBar('login success', 'oke', 'success');
          this.loginForm.reset();
          this.router.navigate(['body'])
        }else{
          this.notifier.showSnackBar('wrong account and password', 'oke', 'error')
        }
      },
      error: () => {
        this.notifier.showSnackBar('There was an error', 'oke', 'error')
      }
    })
  }
}
