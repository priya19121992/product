import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonService} from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginJson: any;

  constructor(private formBuilder: FormBuilder, private router: Router, public commonService: CommonService) { 
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.commonService.getLoginJson().subscribe(res => {
        this.loginJson = res;
    });
  }

  get f() { return this.loginForm.controls;}

  onSubmit() {
    this.submitted = true;
    if(this.loginForm.invalid) {
      return;
    }
    for(let i=0; i<this.loginJson.length;i++) {
      if(this.loginJson[i].username===this.loginForm.value.username){
        if(this.loginJson[i].password===this.loginForm.value.password){
          this.router.navigateByUrl('/cartProduct');
        }
      }
    }
  }


}

