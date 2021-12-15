import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private myAppUrl = 'http://localhost:63107/';
  private myApiUrl = 'api/book/'

  constructor(private http: HttpClient) { }

  getListLibros(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + id);
  }

  deleteLibro(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  }

  saveLibro(libro: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, libro);
  }

  updateTLibro(id: number, libro: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, libro);
  }
}
