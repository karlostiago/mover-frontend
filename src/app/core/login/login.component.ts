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
        this.authService.resetPermissions();
        this.version = environment.version;
    }

    async login() {
        this.authService.login(this.auth).then(response => {
            if (response.token) {
                const words = response.username.split(' ');
                const username = `${words[0]} ${words[1]}`;
                localStorage.setItem('APP_TOKEN', response.token);
                localStorage.setItem('APP_USERNAME', username);
                localStorage.setItem('APP_TOKEN_EXPIRATION', String(response.expiration));
                this.authService.loadingPermissions();
            }
            this.router.navigate(['/dashboard']).then(r => console.log('login executado com sucesso.'));
        });
    }
}
