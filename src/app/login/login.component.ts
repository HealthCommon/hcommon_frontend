import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../models/user';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls:['login.component.css']
})

export class LoginComponent implements OnInit {
    user: User = new User();
    loading = false;
    returnUrl: string;
    submitted = false;
    private authenticationStatus: boolean;
    private location: Location;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
        ) { }

    ngOnInit() {

            // reset login status
            //this.authenticationService.logout();
            if(sessionStorage.getItem('currentUser')){
                this.router.navigate(['/home']);
                console.log("user already logged in");
            }else{
                console.log("user not logged in");
            }

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    signIn() {
        this.userService.authenticateUser(this.user.mobile , this.user.password);
    }

    Register() {
        this.router.navigate(['/register']);
    }
}
