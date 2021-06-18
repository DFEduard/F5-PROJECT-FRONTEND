import {Injectable} from '@angular/core';
import {ApiService} from './api.services';
import {Tokens} from '../classes/tokens';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
export class AuthService{
    public isLoggedIn: boolean = false;
    public redirectUrl: string = '/users';
    public errorMsg: string = "";

    private redirectHomePage: string = '/login'
    private refreshToken = "refreshTk"
    private accessToken = "accessTk"

      // Useit to print the API results
    private DEBUG_API_RESPONSE = false;

    constructor(private apiService: ApiService, private router: Router) {}

    login(email, password){
        const body = {
            "email": email,
            "password": password
        };
        return this.apiService.getTokens(body)
    }

    storageTokens(tokens: Tokens){
        localStorage.setItem(this.accessToken, tokens.access)
        localStorage.setItem(this.refreshToken, tokens.refresh)
    }

    loggedIn(): boolean{
        return !!localStorage.getItem(this.accessToken) || !!localStorage.getItem(this.refreshToken)
    }

    getAccessToken() {
        return localStorage.getItem(this.accessToken)
    }

    // get new access token - valid for 24 hours
    refreshAccessToken() {
        if (!!localStorage.getItem(this.refreshToken))
        {
            let body = {
                "refresh": localStorage.getItem(this.refreshToken)
            }
            
            this.apiService.getRefreshToken(body).subscribe(
                (data) => {
                    
                    localStorage.setItem(this.accessToken, data['access'])
                    localStorage.removeItem(this.refreshToken)

                    this.debugAPI(data, "SUCCESS: Get new access token")
                },
                (error) => {
                    
                    this.router.navigate([this.redirectHomePage])

                    this.debugAPI(error, "ERROR: Get new access token")
                }
            )
        }
        else 
        {
            localStorage.removeItem(this.accessToken)
            this.router.navigate([this.redirectHomePage])
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