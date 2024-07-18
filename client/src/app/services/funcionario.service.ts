import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../interfaces/funcionario.interface';
import { environment } from 'src/environments/environment'; // Ajuste o caminho conforme necessário
import cli from '@angular/cli';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl+'/funcionarios');
  }
  getFuncionarioPage(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/funcionarios/page/'+page+'/'+pageSize);
  }
  getFuncionarioById(id: string): Observable<Funcionario> {
    return this.http.get<Funcionario>(this.apiUrl+'/funcionarios/'+id);
  }
  getFuncionarioByName(name: string): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl+'/funcionarios/nome/'+name);
  }
  createFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl+'/funcionarios', funcionario);
  }
  updateFuncionarioById(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(this.apiUrl+'/funcionarios/atualizar/'+funcionario.id, funcionario);
  }
  deleteFuncionarioById(id: string) {
    return this.http.delete(this.apiUrl+'/funcionarios/deletar/'+id);
  }

}
