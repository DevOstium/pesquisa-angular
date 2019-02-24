import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import * as jtw_decode from 'jwt-decode';

@Injectable({ providedIn: 'root'})
export class UserService { 

    // Subject: eu posso emitir um valor para ele e ao mesmo tempo 
    //          posso me inscrever subscribe para receber esse valor de volta
    // exmplo: private userSubject = new Subject<User>();
    // O HeadComponent ainda não foi renderizado. E o Subject já criou, passou. 

    // BehaviorSubject:   
    // ele emite o valor e fica esperando alguem pegar o dado.... por isso, é possível pegar o valor mesmo que demore para ser rendereizado.
    private userSubject = new BehaviorSubject<User>(null);
   
    private userName: string;  // para pegar o usuário logado

    constructor( private tokenService: TokenService ) { 

        this.tokenService.hasToken() && this.decodeAndNotify();  // para o token permancer no navegar, entrar e continuar logado
    
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify() {
        const token    = this.tokenService.getToken();  // estou pegando o Token
        
        const user     = jtw_decode(token);     // decodifico o payload do Token, uso o cast pq as propriesdades são as mesmas
        
        console.log("Decode: no UserService : " , jtw_decode(token))
        this.userName  =  user.name;                      // para pegar o usuário logado
        this.userSubject.next(user);                   
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);  //  para emitir um null
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    getUserName() {
        return this.userName;  // para pegar o usuário logado
    }
}