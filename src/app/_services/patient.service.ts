import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError , map , tap } from 'rxjs/operators';
import { Element } from '../models/element';
import { MatTableDataSource } from '@angular/material';
import { Patient } from '../models/patient';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PatientService {

  private PATIENT_URL ='http://ec2-13-127-3-247.ap-south-1.compute.amazonaws.com:8080/hc/api/v1/patients';
  private DOC_URL ='http://ec2-13-127-3-247.ap-south-1.compute.amazonaws.com:8080/hc/api/v1/documents';
  public patients;
  public patient:Patient = new Patient();
  public documents;

  constructor(private http: HttpClient, private router: Router){

  }

  addPatient(patient:  Patient) {

    return this.http.post(this.PATIENT_URL , patient , httpOptions).subscribe(
      (data) => {
        alert("Patient registred successfully!");
        this.router.navigate(['/home']);
      },
      err => {
        console.log("Patient registration failed!");
      },
      () => {
        console.log("Post observable now complete!");
      }
    );
  }

  getPatients(userId: string):any {
    return this.http.get(this.PATIENT_URL + "/user/" +  userId, httpOptions).subscribe(
      (data) => {
        return this.patients = data;
      },
      err => {
        console.log("XHR request failed to load patient list!");
      },
      () => {
        console.log("Post observable now complete!");
      }
    );
  }

  getPatientsById(patientId: string):any {
    return this.http.get(this.PATIENT_URL + "/" +  patientId, httpOptions).subscribe(
      (data) => {
        return this.patient = <Patient> data;
      },
      err => {
        alert("An error occured. Failed to load patient details!");
        this.router.navigate(["/home"]);
        console.log("XHR request failed to load patient list!");
      },
      () => {
        console.log("Post observable now complete!");
      }
    );
  }

  getDoumentsByPatientId(patientId: string):any {
    return this.http.get(this.DOC_URL + "/patient/" +  patientId, httpOptions).subscribe(
      (data) => {
        return this.documents = data;
      },
      err => {
        alert("An error occured. Failed to load patient documents!");
        console.log("XHR request failed to load patient list!");
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
    console.log("inside handleError method of  paient service 1");
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log("inside handleError method of  paient service 2");
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log("inside log method of patient service");
    console.log(message);
    //this.messageService.add('HeroService: ' + message);
  }


}
