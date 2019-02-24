import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root'})
export class PlatformDetectorService { 

    // Para saber em qual plataforma estou usando
    constructor(@Inject(PLATFORM_ID) private platformId: string) { }

    isPlatformBrowser() {
        return isPlatformBrowser(this.platformId);
    }
}