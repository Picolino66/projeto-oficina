import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';
import { environment } from 'src/environments/environment'; // Ajuste o caminho conforme necessário
import cli from '@angular/cli';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl+'/clientes');
  }
  getClientesPage(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/clientes/page/'+page+'/'+pageSize);
  }
  getClienteById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(this.apiUrl+'/clientes/'+id);
  }
  getClienteByName(name: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl+'/clientes/nome/'+name);
  }
  getClientePageByName(name: string, page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/clientes/nomePage/'+name+'/'+page+'/'+pageSize);
  }
  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl+'/clientes', cliente);
  }
  updateClienteById(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.apiUrl+'/clientes/atualizar/'+cliente.id, cliente);
  }
  deleteClienteById(id: string) {
    return this.http.delete(this.apiUrl+'/clientes/deletar/'+id);
  }

}
