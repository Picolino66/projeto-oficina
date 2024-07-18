import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico } from '../interfaces/servico.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.apiUrl+'/servicos');
  }
  getTotalServicos(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl+'/servicos/total');
  }
  getServicosPage(page: number, pageSize: number, filtroPagamento: number): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/servicos/page/'+page+'/'+pageSize+'/'+filtroPagamento);
  }
  getServicosIdProprietarioPage(page: number, pageSize: number, id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/servicos/'+id+'/page/'+page+'/'+pageSize);
  }
  getServicoById(id: string): Observable<Servico> {
    return this.http.get<Servico>(this.apiUrl+'/servicos/'+id);
  }
  getServicoByPlaca(placa: string): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.apiUrl+'/servicos/placa/'+placa);
  }
  getServicoByProprietario(page: number, pageSize: number, filtroPagamento: number, nome: string): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/servicos/page/proprietario/'+page+'/'+pageSize+'/'+filtroPagamento+'/'+nome);
  }
  createServico(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(this.apiUrl+'/servicos', servico);
  }
  updateServicoById(servico: Servico): Observable<Servico> {
    console.log(servico);
    return this.http.put<Servico>(this.apiUrl+'/servicos/atualizar/'+servico.id, servico);
  }
  deleteServicoById(id: string) {
    return this.http.delete(this.apiUrl+'/servicos/deletar/'+id);
  }

  imprimir(id: string) {
    return this.http.get(this.apiUrl+'/pdf/cupom/'+id, { responseType: 'blob' });
  }

}
