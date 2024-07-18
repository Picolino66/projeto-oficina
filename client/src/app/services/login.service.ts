import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private apiUrl = environment.apiUrl;
  private authStatus = new BehaviorSubject<boolean>(this.isAdmin());
  authStatus$ = this.authStatus.asObservable();
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const data = {username, password};
    return this.http.post(this.apiUrl+'/login', data).pipe(
      map((response: any) => {
        // Supondo que o token esteja na resposta sob a chave 'token'
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.setNivel(response.nivel);
        }
        return response;
      })
    );
  }

  cadastro(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/usuarios', usuario);
  }

  setNivel(nivel: string){
    localStorage.setItem('nivel', nivel);
    this.authStatus.next(this.isAdmin());
  }

  logout() {
    localStorage.removeItem('nivel');
    this.authStatus.next(this.isAdmin());
  }

  isAdmin(): boolean {
    return localStorage.getItem('nivel') === "1";
  }

}
