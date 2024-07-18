import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {

  constructor() { }

  mostrarAlerta(title: string, text: string, icon: 'warning' | 'error' | 'success' | 'info' | 'question'): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    });
  }

  mostrarConfirmacao(title: string, text: string, icon: 'warning' | 'error' | 'success' | 'info' | 'question'): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon
    });
  }

}
