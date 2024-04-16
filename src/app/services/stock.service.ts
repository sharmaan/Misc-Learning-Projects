import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private _http: HttpClient) {}

  addFinanceData(data: any): Observable<any> {
    return this._http.post('http://localhost:5000/addData', data);
  }

  updateFinanceData(symbol: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:5000/updateData/${symbol}`, data);
  }

  getFinanceDataList(): Observable<any> {
    return this._http.get('http://localhost:5000/getData');
  }

  deleteFinanceData(symbol: string): Observable<any> {
    return this._http.delete(`http://localhost:5000/deleteData/${symbol}`);
  }
}