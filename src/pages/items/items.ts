import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {OrdersApiProvider} from '../../providers/orders-api';
import {AppHelpersProvider} from '../../providers/app-helpers';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import "rxjs/add/observable/zip";
import "rxjs/add/observable/from";
import 'rxjs/add/operator/map';

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {

  items:any[];
  title:string;
  id:string;
  docType:string;
  loadingVisible: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService:OrdersApiProvider) {
            this.loadingVisible = true;
            this.id = this.navParams.get('id');
            this.docType = this.navParams.get('type');
  }

  ionViewDidLoad() {

  };
  ngOnInit() {
    this.refresh();
  };
  onRowPrepared(e): void {
    let item = e.appointmentData;
  };
  onCellPrepared(e): void {
    if (e.rowType == "data" && (e.columnIndex == 3 || e.columnIndex == 2) ) {
        e.cellElement.textContent = new AppHelpersProvider().numberWithSpaces(e.value);
    }
  };
  onToolbarPreparing(e): void {
    let toolbarItems = e.toolbarOptions.items;
    toolbarItems.push({
      widget: 'dxButton',
      options: { icon: 'pulldown', onClick: this.refresh.bind(this) },
      location: 'before'
    });
  };
  refresh(): void {
      if(this.docType == 'order'){
        this.apiService.getOrderItems(this.id).subscribe(
          data => {
            this.items = data;
            if(this.items.length > 0) this.title = 'Заказ № ' + this.items[0].idDoc + ' от ' + new AppHelpersProvider().dateString(this.items[0].docDate) + ' - ' + this.items[0].customer;
          },
          error => {
            console.log(error);
          }
        );
      }
      else{
       this.apiService.getInvoiceItems(this.id).subscribe(
          data => {
            this.items = data;
            if(this.items.length > 0) this.title = 'Накладная № ' + this.items[0].idDoc + ' от ' + new AppHelpersProvider().dateString(this.items[0].docDate) + ' - ' + this.items[0].customer;
          },
          error => {
            console.log(error);
          }
        );
      }
  };
  customizeSum(data: any): any {
    return new AppHelpersProvider().numberWithSpaces(data.value);
  };

}
