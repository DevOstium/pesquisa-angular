import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

@Directive({
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective { 

    @Input() brightness = '70%';

    constructor(
                    private el      : ElementRef, // casca antes de tocar no elemento html nativo
                    private render  : Renderer    // Para manipular o dom
               ) {}

    @HostListener('mouseover')
    darkenOn() {
        // this.el.nativeElement tenho acesso ao elemento nativo do dom
        //this.render para garantir a manipulação do dom, pq no servidor NÃO HÁ DOM 
        this.render.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOff() {
        this.render.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
    }
}