import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notifier.service';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})

export class SingupComponent implements OnInit {
  genderList = ['male', 'female', 'other']
  public signupForm !: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router ,
    private notifier: NotifierService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.FormBuilder.group({
      userName: ['',
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ],
      password: ['',
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ],
      repeatedPassword: ['',
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required, ],
      email: ['', Validators.required, Validators.email],
    });
  }

singUp(){
  this.api.postUser(this.signupForm.value)
  .subscribe({
    next: (res) =>{
      this.notifier.showSnackBar('Sing Up Success', 'oke', 'success')
      this.signupForm.reset();
      this.router.navigate(['login'])
    },
    error: () => {
      this.notifier.showSnackBar('There was an error', 'oke', 'error')
    }
  }
  )
}
}
