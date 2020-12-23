import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpiryTimer: any;

    constructor(private _http: HttpClient, private router: Router) { }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if (this.tokenExpiryTimer) {
            clearTimeout(this.tokenExpiryTimer);
        }
        this.tokenExpiryTimer= null;
    }

    autoLogin() {
        const usrData: {
            email: string,
            id: string,
            _token: string,
            _tokenExp : string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!usrData) {
            return;
        }

        const loadedUsr = new User(usrData.email, usrData.id, usrData._token, new Date(usrData._tokenExp));
        if (loadedUsr.token) {
            this.user.next(loadedUsr);
            const expDuration = new Date(usrData._tokenExp).getTime() - new Date().getTime();
            this.autoLogOut(expDuration);
        }
    }

    autoLogOut(timeout: number) {
        this.tokenExpiryTimer=setTimeout(() => {
            this.logout();
        }, timeout);

    }

    signup(email: string, pwd: string) {
        return this._http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2FO50ouYJVc98HL7RzfRidmbS_NFKAbc",
            {
                email: email,
                password: pwd,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(res => {
            this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
        }));
    }

    loginUser(email: string, pwd: string) {
        return this._http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2FO50ouYJVc98HL7RzfRidmbS_NFKAbc',
            {
                email: email,
                password: pwd,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(res => {
            this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
        }));
    }

    private handleError(err: HttpErrorResponse) {
        let errorMsg = "An unknown error occured!"
            if (!err.error || !err.error.error) {
                return throwError(errorMsg);
            }
            switch (err.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMsg = "This Email already exists. Please use a different one.";
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMsg = "This Email Address specified is not identified/registered with us yet.";
                    break;
                case 'INVALID_PASSWORD':
                    errorMsg = "The password provided is incorrect. Please check and specify the correct one.";
                    break;
            }
            return throwError(errorMsg);
    }

    private handleAuthentication(email: string, id: string, token:string, expires: number) {
        const expiryDt = new Date(new Date().getTime() * expires * 1000);
        const usr = new User(email, id, token, expiryDt);
        this.user.next(usr);
        localStorage.setItem('userData', JSON.stringify(usr));
        this.autoLogOut(expires * 1000);
    }
}