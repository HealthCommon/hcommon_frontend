import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { User } from '../models/user';

@Injectable()
export class UserService{

  private USER_URL ='http://ec2-13-127-3-247.ap-south-1.compute.amazonaws.com:8080/hc/api/v1/users';
  private LOGIN_URL = this.USER_URL + '/auth/login';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient , private router: Router){

  }

  registerUser(user: User) {
    console.log(user);
    return this.http.post(this.USER_URL, user, this.httpOptions)
    .subscribe(
      (data) => {
        alert("User registred successfully!");
        this.router.navigate(['/login']);
      },
      err => {
        alert("Unknown error!");
        console.log("User registration failed!");
      },
      () => {
        console.log("Post observable now complete!");
      }
    );
  }
  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    console.log("inside handleError method of user registration service");
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log("inside log method of user registration service");
    console.log(message);
    //this.messageService.add('HeroService: ' + message);
  }

  authenticateUser(phoneNumber: string , password: string): boolean {

    this.httpOptions.headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    this.http.post(this.LOGIN_URL, "username=" + phoneNumber + "&password=" + password, this.httpOptions)
    .subscribe(
      (data) => {
        let user = data;
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/home']);
      },
      err => {
        alert("Invalid username/password!");
        return false;
      },
      () => {
        console.log("Post observable now complete!");
      }
    );
    return true;
  }

  logout(){
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
