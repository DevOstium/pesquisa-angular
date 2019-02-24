import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './singup/singup.component';
import { LoginGuard } from '../core/auth/login.guard';

const routes: Routes = [
    { 
        //http://localhost:4200/#/home/
        path        : '',  // carregar o primeiro com os dados do HomeComponent
        component   : HomeComponent,
        canActivate : [LoginGuard],
        children    : [
                        { 
                            //http://localhost:4200/#/home/
                            path      : '',     //  carrego juntos com o HomeComponent
                            component : SignInComponent,
                            data      : {
                                            title: 'Sign in'
                                        }
                        }, 
                        { 
                            //http://localhost:4200/#/home/signup
                            path      : 'signup',   // como eu tenho o router-outlet eu posso trocar o conteúdo com o SignInComponent no mesmo pedaço de página
                            component : SignUpComponent,
                            data      : {
                                            title: 'Sign up'
                                        }
                        },            
                    ]
    },              
];

@NgModule({
    imports: [ 
        RouterModule.forChild(routes) 
    ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule { }

