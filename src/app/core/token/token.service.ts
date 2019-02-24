import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({   providedIn: 'root'   })
export class TokenService {

    hasToken() {
        return !!this.getToken();  // !! para eu retornar true ou false. string zero é false
    }

    setToken(token) {
        window.localStorage.setItem(KEY, token);
    }

    getToken() {
        return window.localStorage.getItem(KEY);
    }

    removeToken() {
        window.localStorage.removeItem(KEY);
    }
}