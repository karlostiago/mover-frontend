import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {AuthEntity} from "../../../entity/AuthEntity";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    auth = new AuthEntity();
    version: string;

    constructor(private router: Router,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        localStorage.removeItem("APP_TOKEN");
        localStorage.removeItem("APP_USERNAME");
        this.version = environment.version;
    }

    login() {
        this.authService.login(this.auth).then(response => {
            if (response.token) {
                localStorage.setItem("APP_TOKEN", response.token);

                const firstWord = this.auth.username.split('@')[0];
                const username = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);

                localStorage.setItem("APP_USERNAME", username);
            }

            this.router.navigate(['/dashboard']).then(r => console.log('login executado com sucesso.'));
        });
    }
}
