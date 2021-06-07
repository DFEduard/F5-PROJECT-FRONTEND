import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  userIcon = './assets/User-Icon.ico'

  constructor() { }

  ngOnInit(): void {
  }

  loginButton(email:string, password:string){
    if (email !== "" && password !== ""){
      console.log(email,password)
    }
    else {
      console.log("Empty fields not allowed!")
    }
  }

}
