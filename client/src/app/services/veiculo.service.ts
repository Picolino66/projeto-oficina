import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from '../interfaces/veiculo.interface';
import { environment } from 'src/environments/environment'; // Ajuste o caminho conforme necessário
import cli from '@angular/cli';


@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getVeiculos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl+'/veiculos');
  }
  getVeiculosByIdCliente(id: string): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl+'/veiculos/byCliente/'+id);
  }
  getVeiculosPage(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/veiculos/page/'+page+'/'+pageSize);
  }
  getVeiculosIdPage(page: number, pageSize: number, id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/veiculos/'+id+'/page/'+page+'/'+pageSize);
  }
  getVeiculoById(id: string): Observable<Veiculo> {
    return this.http.get<Veiculo>(this.apiUrl+'/veiculos/'+id);
  }
  getVeiculoByNome(placa: string, page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/veiculos/nomePage/'+placa+'/'+page+'/'+pageSize); //placa na verdade é o nome
  }
  createVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    console.log(veiculo);
    return this.http.post<Veiculo>(this.apiUrl+'/veiculos', veiculo);
  }
  updateVeiculoById(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<Veiculo>(this.apiUrl+'/veiculos/atualizar/'+veiculo.id, veiculo);
  }
  deleteVeiculoById(id: string) {
    return this.http.delete(this.apiUrl+'/veiculos/deletar/'+id);
  }

}
