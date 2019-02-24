import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {
  
  @Input() photos: Photo[] = [];  // uso esse ngOnChanges para manter o meu @input atualizado com as alterações

  rows: any[] = [];
  
  constructor() { }
  

  //ngOnChanges recebe todas as possíveis mudanças do inbound properties @Input() photos
  ngOnChanges( changes: SimpleChanges ) {

      if(changes.photos) { 
        this.rows = this.groupColumns(this.photos);
      }
  
  }
  // vou ter um array [] com outro array dentro [ [1,2,3 ], [1,2,3], [1,2,3] ]

  groupColumns( photos : Photo[] ) {
      
      const newRows = [];

      for(let index = 0; index < photos.length; index+=3) {
      
          newRows.push(photos.slice( index, index + 3));
                // o Array começa de   0, 1 , 2
                // primeira passada    0      3
                // segunda passada     3      6
      
      }

    return newRows;
  }
}