import { Injectable } from '@angular/core';

/*
  Generated class for the AppConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppConfigProvider {

  urlAgents:string;
  urlOrders:string;
  urlInvoices:string;
  urlItemsOrder:string;
  urlItemsInvoice:string;
  constructor() {
    this.urlAgents = 'mobile/agents';
    this.urlOrders = 'mobile/orders/';
    this.urlInvoices = 'mobile/invoices/';
    this.urlItemsOrder = 'mobile/orderItems/';
    this.urlItemsInvoice = 'mobile/invoiceItems/';
  }

  getUrlAgents():string{
    return this.urlAgents;
  }
  getUrlOrders():string{
    return this.urlOrders;
  }
  getUrlInvoices():string{
    return this.urlInvoices;
  }
  getUrlOrderItems():string{
    return this.urlItemsOrder;
  }
  getUrlInvoiceItems():string{
    return this.urlItemsInvoice;
  }


}
