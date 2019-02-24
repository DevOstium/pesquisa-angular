import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector     : 'ap-search',
    templateUrl  : './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
    
    @Output() onTyping = new EventEmitter<string>();
    
    @Input()  value: string = '';


    //Angular parte 1: Fundamentos - Aula 06 Melhorando a experiência do usuário item 07 RxjS e seu Subject
    debounce: Subject<string> = new Subject<string>();
    
    ngOnInit(): void {
    
       // this.debounce.next('valor a ser passado')
       // this.debounce.subscribe(value => alert(value)); // aqui vou receber o dado: valor a ser passado
    
        this.debounce
                    .pipe( debounceTime(300) )  // 300 milisegundos
                                                //  (onTyping)="filter = $event" o valor que estou inserindo aqui no filter 
                                                // Comunicação entre um componente filho e componente pai onTyping.emit
                                              .subscribe( filter => this.onTyping.emit(filter) );  // cuidado com o Memory Leak
    }    

    ngOnDestroy(): void {
        // Para corrigir o Memory Leak
        // Se estou trabalhando com um Observable que não chama o complete
        this.debounce.unsubscribe();
    }

 }