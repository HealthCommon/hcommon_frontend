import { Component } from '@angular/core';
import { User } from '../models/user';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UUID } from 'angular2-uuid';

@Component ({
    selector : 'app-register',
    templateUrl: './register.component.html',
    styleUrls:['register.component.css']
})

export class RegisterComponent implements OnInit{

    confPassword: string;
    user: User;

    constructor(private router: Router , private userService: UserService){

    }

    ngOnInit(): void {
      this.user = {
        userId: "",
        fullName: "",
        mobile: "",
        password: "",
        email:"",
        imageUrl:"",
        otp:""
        }
    }

    public registerUser(): void{
        console.log("inside register method");
        // // collect all user detail inside the
        // this.router.navigate(['/otp']);
        if(this.ifPasswordMatched()){
          this.user.userId = UUID.UUID();
          this.userService.registerUser(this.user);
        }
    }

    public ifPasswordMatched(): boolean {
        if(this.user.password === this.confPassword){
            console.log("password matched!");
            return true;
        }else{
            console.log("password not matched!");
            return false;
        }
    }

    public Login(): void{
        this.router.navigate(['/login']);
    }

}
