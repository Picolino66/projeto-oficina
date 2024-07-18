import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico } from '../interfaces/servico.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FuncionarioServicoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getServicosByIdFuncionario(page: number, pageSize: number, id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/funcionarioServico/page/funcionario/'+page+'/'+pageSize+'/'+id);
  }
}
