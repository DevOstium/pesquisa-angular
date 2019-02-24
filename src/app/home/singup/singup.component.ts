import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { PlatformDetectorService } from '../../core/plataform-detector/platform-detector.service';
import { userNamePassword } from './username-password.validator';

@Component({
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ]
})
export class SignUpComponent implements OnInit {
    
    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;
    
    constructor(
                private formBuilder                   : FormBuilder,
                private userNotTakenValidatorService  : UserNotTakenValidatorService,
                private signUpService                 : SignUpService,
                private router                        : Router,
                private platformDetectorService       : PlatformDetectorService
               ) {}

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group(
                                                    {
                                                        email: ['', 
                                                            [
                                                                Validators.required,
                                                                Validators.email
                                                            ]
                                                        ],
                                                        fullName: ['', 
                                                            [
                                                                Validators.required,
                                                                Validators.minLength(2),
                                                                Validators.maxLength(40)
                                                            ]
                                                        ],
                                                        userName: [
                                                            '',   // esse é o valor padrão
                                                            [
                                                                 Validators.required,
                                                                 lowerCaseValidator,             // validadores assincronos
                                                                 Validators.minLength(2),         // dentro desse array só os validadores sincronos 
                                                                 Validators.maxLength(30)       
                                                            ], 
                                                            // Meu validador Personalizado
                                                            // Um validador assincrono não retorna: null e nem objeto javascript
                                                            // Ele retorna um Observable que o angular depois de executar retorna um null ou javascript
                                                            this.userNotTakenValidatorService.checkUserNameTaken()  // Validador Assincrono
                                                        ],
                                                        password: ['', 
                                                            [
                                                                 Validators.required,
                                                                 Validators.minLength(8),
                                                                 Validators.maxLength(14)
                                                            ]
                                                        ]
                                                    }, {
                                                                validator: userNamePassword
                                                        }
                                                );

        this.platformDetectorService.isPlatformBrowser() &&  this.emailInput.nativeElement.focus();    
    } 

    signup() {
            
            if(this.signupForm.valid && !this.signupForm.pending) {
                
                // Para pegar todos os campos do formulário de uma vez this.signupForm.getRawValue() as NewUser
                // NewUser é uma classe com os mesmos campos dos formulário 
                const newUser = this.signupForm.getRawValue() as NewUser;
            
                        this.signUpService
                                        .signup( newUser )
                                                         .subscribe(
                                                                    ()  => this.router.navigate( [''] ),
                                                                    err => console.log(err)
                                                                  );
             }
    }
}