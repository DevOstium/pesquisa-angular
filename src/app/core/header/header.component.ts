import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { Router } from '@angular/router';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent { 

    user$: Observable<User>;

    // user : User; // elimino isso o <div *ngIf="(user$ | async) as user; else login">
    // (user$ | async) faz o destroi

    constructor(
                private userService : UserService, 
                private router      : Router
               ) {

        console.log("userService.getUserName() " , userService.getUserName())

        this.user$ = userService.getUser();
   
        // elimino isso o <div *ngIf="(user$ | async) as user; else login">
       // this.user$.subscribe( user => this.user = user); // Peguei o valor do Obeservable        
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['']);  // rota para o /login
    }
}