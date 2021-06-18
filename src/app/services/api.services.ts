import {Injectable} from '@angular/core'
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {Tokens} from '../classes/tokens'
import {User} from '../classes/user';
import {catchError} from 'rxjs/operators'


@Injectable({providedIn: 'root'})
export class ApiService{

    private baseUrl = "http://localhost:59346"
    private usersAPI = this.baseUrl+"/api/users/"
    private tokenAPI = this.baseUrl+"/api/token/"
    private refreshToken = this.baseUrl+"/api/token/refresh/"

    constructor(private http: HttpClient){

    }

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(this.usersAPI)
    }

    getUser(id:string): Observable<User>{
        return this.http.get<User>(this.usersAPI+id+"/")
    }

    postUsers(body): Observable<User>{
        return this.http.post<User>(this.usersAPI, body)
    }

    editUser(id: string, body): Observable<User>{
        return this.http.put<User>(this.usersAPI+id+"/", body)
    }

    deleteUser(id: string): Observable<any>{
        return this.http.delete(this.usersAPI+id+"/")
    }

    getTokens(body): Observable<Tokens>{
        return this.http.post<Tokens>(this.tokenAPI, body)
        
    }

    getRefreshToken(body): Observable<any>{
        return this.http.post<any>(this.refreshToken, body);
    }
}