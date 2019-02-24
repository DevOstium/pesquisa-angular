import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(
                    private userService : UserService,
                    private router      : Router
               ) {}

    canActivate (
                 route : ActivatedRouteSnapshot, 
                 state : RouterStateSnapshot
                ) : boolean | Observable<boolean> | Promise<boolean> {
                    
                        // { queryParams: { fromUrl: state.url } isso quando eu for tentar acessar uma url e meu token já expirou,
                        // então o usuário primeiro vai ser redirecionado para o login, e depois de eu logar vou para a rota desejada
                        // Caminho da aula: Angular parte 2: Autenticação, Forms e lazy loading
                        // Aula 03  - item 08 - Guarda de Rotas
                        // Angular parte 3: upload, build e novos componentes
                        // Aula 02 item 08 Bloqueando acesso não autenticado
                        // Parte 04 Aula 07 Item 04 e 05
                        if(!this.userService.isLogged()) {

                            // fromUrl: state.url inseri na barra de endereços do navagador: http:localhost:4200/fromUrl=state.url

                                this.router.navigate ( [''], { queryParams: { fromUrl: state.url } } );
                            return false;
                        }
            return true;
    }
}