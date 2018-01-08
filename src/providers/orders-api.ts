import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {AppConfigProvider} from './app-config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import "rxjs/add/observable/throw";

@Injectable()
export class OrdersApiProvider {
  constructor(private http: Http, private appConfig: AppConfigProvider) { }
  getAgents(): Observable<any[]> {
    return this.http.get(this.appConfig.getUrlAgents())
      .map(response => response.json())
      .catch((error: any) => { return Observable.throw(error); });
  }
  getOrders(id: string): Observable<any[]> {
    return this.http.get(this.appConfig.getUrlOrders() + id)
      .map(response => response.json())
      .catch((error: any) => { return Observable.throw(error); });
  }
  getInvoices(id: string): Observable<any[]> {
    return this.http.get(this.appConfig.getUrlInvoices() + id)
      .map(response => response.json())
      .catch((error: any) => { return Observable.throw(error); });
  }
  getInvoiceItems(id: string): Observable<any[]> {
    return this.http.get(this.appConfig.getUrlInvoiceItems() + id)
      .map(response => response.json())
      .catch((error: any) => { return Observable.throw(error); });
  }
  getOrderItems(id: string): Observable<any[]> {
    return this.http.get(this.appConfig.getUrlOrderItems() + id)
      .map(response => response.json())
      .catch((error: any) => { return Observable.throw(error); });
  }
}



