import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setData<T>(data: T): void {
    this.dataSubject.next(data);
  }

  getData<T>(): Observable<T> {
    return this.dataSubject.asObservable();
  }

  clearData(): void {
    this.dataSubject.next(null);
  }
}
