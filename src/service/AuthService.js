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

    static isLoggedIn() {
        return localStorage.getItem('token');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static logIn(token) {
        localStorage.setItem('token', token);
        EventEmitter.emit('onAuthChange')
    }

    static logOut() {
        localStorage.removeItem('token');
        EventEmitter.emit('onAuthChange')
    }
}