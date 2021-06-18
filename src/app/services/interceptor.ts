import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { AuthService } from './auth.service';
import {catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor{
    constructor(private injector: Injector) {}

    authService = this.injector.get(AuthService);
    intercept(req, next){
        let tokenizeReq = req.clone({
            setHeaders:{
                Authorization: `Bearer ${this.authService.getAccessToken()}`
            }
        })
        return next.handle(tokenizeReq).pipe(
            catchError(error => this.handleError(error))
        )
    }

    private handleError(error: HttpErrorResponse){
        if (error.status == 401){
            this.authService.refreshAccessToken()
        }
        
        return throwError(error)
    }
    
}
