import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  userIcon = './assets/User-Icon.ico'
  isError: boolean = false;
  errorMessage = "";

  // Useit to print the API results
  private DEBUG_API_RESPONSE = false;

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  loginButton(email:string, password:string){
    if (email !== "" && password !== ""){

      this.authService.login(email, password).subscribe(data =>{

        this.authService.storageTokens(data)
        this.router.navigate([this.authService.redirectUrl])

        this.debugAPI(data, "SUCCESS: APT Get Tokens")

      }, (error) => {
        this.errorHandler(error)
        this.debugAPI(error, "ERROR: APT Get Tokens")
      });
    }
    else {
      this.errorMessage = "Empty fields not allowed!"
    }
  }


  private errorHandler(errorRes: HttpErrorResponse){
      this.isError = true;
      switch(errorRes.status){
        case 400:
          this.errorMessage = errorRes.error['error']
         break;
        default:
          this.errorMessage = "Server is not responding "
      }
  }

    // used to print API responses 
  private debugAPI(data, info:string = ""){
      if (this.DEBUG_API_RESPONSE){
        if (info != "")
        {
          console.log(info, data)
        }
        else{
          console.log("Console debug enabled:",data)
        }
          
      }
  }

}

