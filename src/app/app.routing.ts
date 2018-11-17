import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
//import { HomeComponent } from './home/index';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/index';
import { OtpComponent } from './register/otp.component';
import { PatientDetailComponent } from './patient_detail/patient-detail.component';
import { AddPatientComponent } from './add-patient/add-patient.component';


const appRoutes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuard]},
    { path: 'home' , component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'register' , component: RegisterComponent},
    { path: 'otp' , component: OtpComponent},
    { path: 'patient-detail' , component: PatientDetailComponent , canActivate: [AuthGuard]},
    { path: 'add-patient' , component: AddPatientComponent , canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
// or we can also write the above statement in a little different way .
// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
