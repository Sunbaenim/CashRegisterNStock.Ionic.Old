import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './../models/auth/login.model';
import { environment } from './../../../environments/environment';
import { TokenModel } from './../models/auth/token.model';
import { BehaviorSubject } from 'rxjs';

const LOGIN_URL: string = environment.apiUrl + 'auth/login/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private connected: boolean;

  constructor(
    private client: HttpClient
  ) {
    this.connected = false;
  }

  login(model: LoginModel) {
    this.connected = true;
    return this.client.post<TokenModel>(LOGIN_URL, model);
  }

  logout() {
    this.connected = false;
  }

  isConnected(): boolean {
    return this.connected;
  }
}
