import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {routing} from './app.routing';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { OtpComponent } from './register/otp.component';
import { PatientDetailComponent } from './patient_detail/patient-detail.component';
import { AddPatientComponent } from './add-patient/add-patient.component';

// Services
import { UserService } from './_services/user.service';
import { PatientService } from './_services/patient.service';

//Guards
import { AuthGuard } from './_guards/index';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    OtpComponent,
    PatientDetailComponent,
    AddPatientComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    routing
  ],
  providers: [AuthGuard , UserService , PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
