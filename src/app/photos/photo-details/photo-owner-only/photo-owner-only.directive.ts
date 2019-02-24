import { Directive, Renderer, OnInit } from "@angular/core";
import { Photo } from "../../photo/photo";
import { Input } from "@angular/core";
import { ElementRef } from "@angular/core";
import { UserService } from "../../../core/user/user.service";

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit { 

    @Input() ownedPhoto : Photo;
    
    constructor(
                private element     : ElementRef<any>,
                private renderer    : Renderer,
                private userService : UserService
            ) {}

    ngOnInit(): void {
         // Angular parte 3: upload, build e novos componentes
         // aula 05 item 04 Ocutando elementos que requerem permissao
        this.userService
                        .getUser()
                                .subscribe( user => {
                                                    if( !user || user.id != this.ownedPhoto.userId ) {
                                                                                this.renderer.setElementStyle (
                                                                                                                this.element.nativeElement, 'display', 'none'
                                                                                                              );
                                                                                                  }
                                                  }
                                         );
    }
}