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
                const username = this.splitText(response.username)
                localStorage.setItem('APP_TOKEN', response.token);
                localStorage.setItem('APP_USERNAME', username);
                localStorage.setItem('APP_TOKEN_EXPIRATION', String(response.expiration));
                this.authService.loadingPermissions();
            }
            this.router.navigate(['/dashboard']).then(r => console.log('login executado com sucesso.'));
        });
    }

    private splitText(text: string) {
        const clearText = text.trim();

        if (this.isEmail(clearText)) {
            const [user, fulldomain] = clearText.split('@');
            const domain = fulldomain.split('.')[0];
            return `${user} ${domain}`.toUpperCase();
        }

        const words = clearText.split(/\s+/);

        return words.slice(0, 2).join(' ').toUpperCase();
    }

    private isEmail(text: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(text);
    }
}
