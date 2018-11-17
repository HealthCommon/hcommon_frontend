import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'otp-root',
    templateUrl: 'otp.component.html',
    styleUrls:['otp.component.css']
})

export class OtpComponent{
    private oneTimePassword: string;

    constructor(private router:Router){

    }

    public otp(): void{
        
    }

    public Register(): void{
        this.router.navigate(['/register']);
    }
}