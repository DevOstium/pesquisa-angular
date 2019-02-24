import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from "./photo";
import { PhotoComment } from './photo-comment';

import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) {}

    listFromUser(userName: string) {
        return this.http.get<Photo[]>(API + '/' + userName + '/photos');       
    }

    listFromUserPaginated( userName: string, page: number ) {


            //http://localhost:3000/flavio/photos?page=2
            const params = new HttpParams().append( 'page', page.toString() );  // queryParams

        return this.http.get<Photo[]>( API + '/' + userName + '/photos', { params } );       
    } 
    
    upload( description: string, allowComments: boolean, file: File ) {
        
        const formData = new FormData(); // parar enviar arquivos. img, file, txt, execel

        formData.append( 'description',    description );
        formData.append( 'allowComments',  allowComments ? 'true' : 'false');
        formData.append( 'imageFile',      file );

        return this.http.post(
                API + '/photos/upload', formData, { observe: 'events', reportProgress: true }
        );

    }

    findById(photoId: number) {

        return this.http.get<Photo>(API + '/photos/' + photoId);
    }

    getComments(photoId: number) {
        return this.http.get<PhotoComment[]>(
                API + '/photos/' + photoId + '/comments'
        );
    }

    addComment(photoId: number, commentText: string) {

        return this.http.post( API + '/photos/' + photoId + '/comments', { commentText }     );        
    }

    removePhoto(photoId: number) {
        return this.http.delete(API + '/photos/' + photoId);
    }

    like(photoId: number) {

        return this.http
                        // { observe: 'response'} para ter acesso ao codigo de status, cabecalho
                        .post( API + '/photos/' + photoId + '/like', {}, { observe: 'response'} )  
                               
                                // chegou a resposta, não importa a resposta, vou converter para o valor true
                                .pipe ( map ( res => true ) )  

                                // retorno um novo Observable of(false)
                                .pipe ( catchError ( err => { return err.status == '304' ? of(false) : throwError(err); } ) );
    }
}
