import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector    : 'app-photo-list',
  templateUrl : './photo-list.component.html',
  styleUrls   : ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos      : Photo[]  = [];
  filter      : string   = '';
  hasMore     : boolean  = true;
  currentPage : number   = 1;
  userName    : string   = '';

  constructor (
                private activatedRoute : ActivatedRoute,
                private photoService   : PhotoService
              ) { }

  ngOnInit(): void {
   
    // Quando eu uso só o segmento da rota  /pedidos  
    this.activatedRoute.params.subscribe( params => {
                                                    this.userName = params.userName;
                                                    //http://localhost:4200/#/home/photos    --  ele pega o photos
                                                    // .data['photos'];  é o data do resolver do AppRoutingModule 
                                                    // Para eu ser notificado para todas as mudanças da rota
                                                    // Para eu conseguir chamar o ngOnit toda vez que mudar de rota
                                                    // Angular parte 3: upload, build e novos componentes
                                                    // aula 04 Comentando fotos - item 08 um problema não esperado
                                                    // estou ouvindo a mudança da mudança de rota
                                                   
                                                   // Usando isso com o Resolver
                                                   // No momento em que eu ativo a rota
                                                   
                                                    this.photos = this.activatedRoute.snapshot.data['photos'];  // indica a rota ativa nesse momento    
                                                   }
                                        );
  }

  load() {
    this.photoService
                     .listFromUserPaginated( this.userName, ++this.currentPage )
                                                    .subscribe( photos => {
                                                                            this.filter  = '';
                                                                            // o concat pega uma lista e concatena outra lista e retorna uma nova lista
                                                                            // PhotosComponent precisa detectar essa mudança
                                                                            // concat cria uma nova referencia
                                                                            this.photos  = this.photos.concat(photos);
                                                                            if(!photos.length) this.hasMore = false;
                                                                          }
                                                                );
      }
}
