import { CovidService } from './../../services/covid.service';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Form, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userList: any = { userName: 'admin', password: 'admin' };
  constructor(private fb: FormBuilder, private router: Router, private service:CovidService) {
    this.loginForm = this.fb.group({
      username: [""],
      password: [""],
    });
    this.username.setValue(this.userList.userName)
    this.password.setValue(this.userList.password)
  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }
  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  ngOnInit(): void {}

  clickLogin() {
    let user = this.loginForm.value;
    
      if (this.userList.userName == user.username && this.userList.password == user.password) {
       alert("Login success !");
       this.service.getLoginStatus(user);
        this.router.navigate(['list-patient']);
      }
      else{
        alert("Login fail !");
      }
   
  }
}
