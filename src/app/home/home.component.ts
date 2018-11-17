import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { PatientService } from '../_services/patient.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
    selector: 'home-root',
    templateUrl: './home.component.html',
    styleUrls:['./home.component.css']
})

export class HomeComponent{
    patients = [];
    private user: User;
    constructor(public userService: UserService , public patientService:PatientService, private router: Router ){

    }
    ngOnInit() {
      this.user = JSON.parse(sessionStorage.getItem("currentUser"));
      this.patientService.getPatients(this.user.userId);
      console.log("done");
    }
    public goToPatientDetail(patientId: String): void {
        let queryParams = { 'queryParams': { 'pid': patientId } };
        this.router.navigate(['/patient-detail'], queryParams);
    }

    public addPatient(): void{
        this.router.navigate(['/add-patient']);
    }
}
