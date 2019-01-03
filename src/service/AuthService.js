// Singleton holder
import EventEmitter from './EventEmitter'

let _instance = null;

export class AuthService {
    constructor() {
        if (_instance) {
            return _instance;
        }
        _instance = this;
        this.token = null;
    }

    isLoggedIn() {
        return localStorage.getItem('token');
    }

    logIn(token) {
        localStorage.setItem('token', token);
        EventEmitter.emit('onAuthChange')
    }

    logOut() {
        localStorage.removeItem('token');
        EventEmitter.emit('onAuthChange')
    }
}