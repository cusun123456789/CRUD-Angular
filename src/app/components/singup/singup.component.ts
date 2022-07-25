import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})

export class SingupComponent implements OnInit {
  genderList = ['male', 'female', 'other']
  public signupForm !: FormGroup;


  constructor(private FormBuilder: FormBuilder, private http: HttpClient, private router: Router , private notifier: NotifierService) { }

  ngOnInit(): void {
    this.signupForm = this.FormBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      repeatedPassword: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
hide = true

singUp(){
  this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
  .subscribe({
    next: (res) =>{
      this.notifier.showSnackBar('Product Added', 'oke', 'success')
      this.signupForm.reset();
      this.router.navigate(['login'])
    },
    error: () => {
      // alert("There was an error")
      this.notifier.showSnackBar('There was an error', 'oke', 'error')
    }
  }
  )
}
}
