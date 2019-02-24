import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    
    fromUrl    : string;
    loginForm  : FormGroup;

    //  @ViewChild serve para o pai se comunica com o elemento filho, exemplo: dar foco no input
    // e colocar a variável de template   <input #userNameInput -- Para daar foco
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
    
    constructor(
                private formBuilder              : FormBuilder,
                private authService              : AuthService,
                private router                   : Router,
                private platformDetectorService  : PlatformDetectorService,
                private activatedRoute           : ActivatedRoute
               ) { }

    ngOnInit(): void {
                    // fromUrl configurado no auth.guard.ts
                    // para ao tentar ir direto para uma url que precisa de autenticação, o sistema redireciona para a tela de login
                    // pego a roda e depois de logar vou para a url desejada 
                     // Parte 04 aula 07 item 06
                    this.activatedRoute.queryParams.subscribe(params => this.fromUrl = params['fromUrl'] );  

                    this.loginForm = this.formBuilder.group(
                                                              {
                                                                userName: ['flavio', Validators.required],
                                                                password: ['123', Validators.required]
                                                              }
                                                            );

                    this.platformDetectorService.isPlatformBrowser() &&  this.userNameInput.nativeElement.focus();        
    } 

    login() {
        const userName = this.loginForm.get('userName').value;          // pego o valor do input
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(userName, password)
            .subscribe(
                        () => this.fromUrl                               // 1 callbak
                            // Caminho conteúdo: 
                            // tenho a string  in this.fromUrl
                            // Parte 04 aula 07 item 06
                            ? this.router.navigateByUrl(this.fromUrl)    // faco um redirect para a página desejada se não estiver logado, só de pois de logar
                            : this.router.navigate( ['user', userName] ) // user/userName  --  o angular concatena o segmento de rota url/rota
                        ,
                        err => {                                         // 2 callBak
                            console.log(err);
                            this.loginForm.reset();                      // limpar o formulário    
                            this.platformDetectorService.isPlatformBrowser() &&  // verifico se estou com o meu site no navegador ou server side.
                            // se for true nem executa depois do &&  e false executa
                             // Não dá pra usar o Renderer aqui. Por causa do proprio framework
                            // Não posso executar no server side
                             this.userNameInput.nativeElement.focus();    // usando isso com o  @ViewChild para dar focus no input
                             alert('Invalid user name or password');
                        }
            );
    }
}