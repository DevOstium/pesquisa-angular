import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';

const routes: Routes = [
    {
        //http://localhost:4200/#/home/
        path        : '',
        pathMatch   : 'full',
        redirectTo  : 'home',  // minha primeira rota, página inicial
    },
    { 
        //http://localhost:4200/#/home/
        path          : 'home',
        loadChildren  : './home/home.module#HomeModule'
    },              
    { 
        path: 'user/:userName',
        pathMatch: 'full',
        component:  PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        },
        data: {
            title: 'Timeline'
        }
    },
    { 
        path: 'p/add', 
        component: PhotoFormComponent,
        canActivate: [AuthGuard],  // para restringir o acesso a rotas se o user está logado ou não.
        data: {
            title: 'Photo upload'
        }
    },
    { 
        path: 'p/:photoId', 
        component: PhotoDetailsComponent,
        data: {
            title: 'Photo detail'
        }
    }, 
    { 
        path: 'error', 
        component: GlobalErrorComponent,
        data: {
            title: 'Error'
        }
    },      
    { 
        path: 'not-found', 
        component: NotFoundComponent,
        data: {
            title: 'Not found'
        }
    },       
    { 
        path: '**',       // para corrigir uma rota inválida, digitei uma url que não existe redireciono para essa pagina
                         // quando eu excluir um item que não existe e tento acessar a rota.
        redirectTo: 'not-found'
    }  
];

@NgModule({
    imports: [ 
        // forRoot é a url até o http://localhost:4200/  
        RouterModule.forRoot(routes, { useHash: true } )   // { useHash: true } é para usar o # na url http://localhost:4200/#/pedido/
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

