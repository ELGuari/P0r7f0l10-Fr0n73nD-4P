import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../Entity/jwt-dto';
import { LoginUsuario } from '../Entity/login-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  authUrl = "https://apelg.herokuapp.com/auth/";

  constructor(private httpClient: HttpClient) { }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.authUrl + 'login', loginUsuario);
    
  }
}
