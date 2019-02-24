import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SignUpService } from './signup.service';

import { debounceTime, switchMap, map, first, tap } from 'rxjs/operators';

@Injectable()
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) {}

    checkUserNameTaken() {

        return ( control : AbstractControl ) => {
                return control
                              //valueChanges retorna um Observable
                             .valueChanges
                                        // posso usar o pipe para encadear várias ações do observable antes de retorna definitivamente
                                        .pipe( debounceTime(300)) // Processo 1 esse    
                                         // switchMap: uso pq o valueChanges tb retorna um Observable, e ao usar o switchMap ele para de ouvir o anterior e para 
                                         // a ouvir o que está dentro do switchMap
                                        .pipe( switchMap( userName  => this.signUpService.checkUserNameTaken( userName ) ) ) // Processo 2 esse
                                        //
                                        .pipe( map( isTaken => isTaken ? { userNameTaken: true } : null) ) // Processo 3 esse
                                        //
                                        .pipe( tap( r => console.log( r ) ) )
                                        // para completar, finalizar e retornar o Observable, pq o angular é singleton, somente um objeto
                                        .pipe( first() );
                                        
        }
    }
}