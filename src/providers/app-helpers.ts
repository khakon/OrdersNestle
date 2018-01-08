import { Injectable } from '@angular/core';

/*
  Generated class for the AppConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppHelpersProvider {

  constructor() { }

  numberWithSpaces(x:any): any {
    try {
      var parts = Number((x).toFixed(2)).toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".");
    }
    catch (err) {
      console.log(x);
      return x;
    }
  };
  dateFormat(x:any): any {
    if(x === undefined || x == '') return '';
    try {
      var parts = x.split("/");
      return parts[1] + '/' + parts[0];
    }
    catch (err) {
      console.log(x);
      return '';
    }
  };
    dateString(x:any): any {
    try {
      var parts = x.substr(0,10).split("-");
      return parts[2] + '/' + parts[1] + '/' + parts[0];
    }
    catch (err) {
      console.log(x);
      return x;
    }
  };
  leftJoin(left:any[], right:any[]): any[] {
    let result :any[] = new Array();
    let rightHash :any = Object.create({});
    right.forEach(function(item){
        rightHash[item.order] = item;
    });
    left.forEach(function(item){
        console.log(rightHash);
        if(rightHash.hasOwnProperty(item.id)){
          let rightItem = rightHash[item.id];
          result.push({customer: item.customer, dateOrder:item.docDate,idOrder:item.idDoc,sumOrder:item.sum, dateInvoice: rightItem.docDate, idInvoice:rightItem.idDoc, sumInvoice:rightItem.sum});
        }
        else{
          result.push({customer: item.customer, dateOrder:item.docDate,idOrder:item.idDoc,sumOrder:item.sum, dateInvoice: '', idInvoice:'', sumInvoice:''});
        }
    });
    return result;
  }
}