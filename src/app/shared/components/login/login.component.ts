import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'ed-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  constructor(private fb:FormBuilder,private router:Router) {

    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm(){
    this.form = this.fb.group(
      {
        "username":['',[Validators.required]],
        "password":['',[Validators.required]],
      }
    );
  }

  submit(){
    if(this.form.valid){
      console.log(this.form.value);
      this._validUser(this.form.value);
    }
  }
  private _validUser(user:User){
    if(user.username == "admin" && user.password == "admin"){
      this.router.navigate(['products/list']);
    }else{
      console.error("invalid credentials");
      
    }
  }

}
