import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

export const CanActivate = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    authService.isLoggedIn().then(response => {
       if (response) {
           return true;
       }  else {
           router.navigate(['/login']).then(() => {});
           return false;
       }
    });
}
