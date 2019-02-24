import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';

@Injectable({ providedIn: 'root'})
export class PhotoListResolver implements Resolve<Observable<Photo[]>>{

     // Angular parte 1: Fundamentos - Aula 06 Melhorando a experiência do usuário item 05 Resolvers
     // Para corrigir a requisição de algo/buscar está aparecendo. durante o carregamento
    // Lembrar de colocar no arquivo de Rotas
    
    constructor( private service: PhotoService ) {}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) : Observable<Photo[]> {
       
             const userName = route.params.userName;
        
         return this.service.listFromUserPaginated(userName, 1);
    }
}