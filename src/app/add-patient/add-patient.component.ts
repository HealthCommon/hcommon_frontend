import { Component } from '@angular/core';
import { Patient } from '../models/patient';
import { OriginConnectionPosition } from '@angular/cdk/overlay';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import { PatientService } from '../_services/patient.service';
import { UserService } from '../_services/user.service';
import { User } from '../models/user';
import { UUID } from 'angular2-uuid';

@Component({
    selector: 'add-patient-root',
    templateUrl: './add-patient.component.html',
    styleUrls: ['./add-patient.component.css']
})

export class AddPatientComponent implements OnInit{
    patient: Patient;
    user: User;
    constructor(public userService : UserService, public patientService : PatientService){

    }

    ngOnInit(): void {
        this.patient = {
            patientId:null,
            userId: null,
            fullName: null,
            age: null,
            gender: null,
            weight: null,
            height: null,
            disease: null,
            tags: null,
            deviceId: null
        }
    }

    public addPatient(): void{
      this.patient.patientId = UUID.UUID();
      this.user = JSON.parse(sessionStorage.getItem("currentUser"));
      this.patient.userId = this.user.userId;
      this.patientService.addPatient(this.patient);
    }
}
