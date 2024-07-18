import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orcamento } from '../interfaces/orcamento.interface';
import { environment } from 'src/environments/environment'; // Ajuste o caminho conforme necessário
import cli from '@angular/cli';


@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrcamentos(): Observable<Orcamento[]> {
    return this.http.get<Orcamento[]>(this.apiUrl+'/orcamentos');
  }
  getOrcamentoById(id: string): Observable<Orcamento> {
    return this.http.get<Orcamento>(this.apiUrl+'/orcamentos/'+id);
  }
  createOrcamento(orcamento: Orcamento): Observable<Orcamento> {
    console.log(orcamento);
    return this.http.post<Orcamento>(this.apiUrl+'/orcamentos', orcamento);
  }
  updateOrcamentoById(orcamento: Orcamento): Observable<Orcamento> {
    return this.http.put<Orcamento>(this.apiUrl+'/orcamentos/atualizar/'+orcamento.id, orcamento);
  }
  deleteOrcamentoById(id: string) {
    return this.http.delete(this.apiUrl+'/orcamentos/deletar/'+id);
  }

}
