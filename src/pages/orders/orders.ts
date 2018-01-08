import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {OrdersApiProvider} from '../../providers/orders-api';
import {AppHelpersProvider} from '../../providers/app-helpers';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import "rxjs/add/observable/zip";
import "rxjs/add/observable/from";
import 'rxjs/add/operator/map';
import { ItemsPage } from '../items/items';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  doc: string = "pivot";
  agent:any;
  orders: any[];
  invoices: any[];
  pivot: any[];
  loadingVisible: boolean = false;
  idOrder:string;
  idInvoice:string;
  viewOrderOptions = {
    onClick: this.viewOrder.bind(this)
  };
  viewInvoiceOptions = {
    onClick: this.viewInvoice.bind(this)
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService:OrdersApiProvider, public alertCtrl: AlertController, private helpers: AppHelpersProvider) {
            this.loadingVisible = true;
            this.agent = this.navParams.get('agent');
            console.log(this.agent);
  }

  ngOnInit() {
    this.refresh();
  }
  onRowPrepared(e): void {
    let item = e.appointmentData;
  }
  onCellPreparedPivot(e): void {
    if (e.rowType == "data" && (e.columnIndex == 3 || e.columnIndex == 6)) {
        e.cellElement.textContent = new AppHelpersProvider().numberWithSpaces(e.value);
    }
    if (e.rowType == "data" && (e.columnIndex == 1 || e.columnIndex == 4)) {
        e.cellElement.textContent = new AppHelpersProvider().dateFormat(e.text);
    }
  }
  onCellPrepared(e): void {
    if (e.rowType == "data" && e.columnIndex == 3) {
        e.cellElement.textContent = new AppHelpersProvider().numberWithSpaces(e.value);
    }
    if (e.rowType == "data" && e.columnIndex == 0) {
        e.cellElement.textContent = new AppHelpersProvider().dateFormat(e.text);
    }
  }
  onToolbarPreparing(e): void {
    let toolbarItems = e.toolbarOptions.items;
    toolbarItems.push({
      widget: 'dxButton',
      options: { icon: 'pulldown', onClick: this.refresh.bind(this) },
      location: 'before'
    });
  }
  refresh(): void {
    this.loadingVisible = true;
    Observable.zip(
      this.apiService.getOrders(this.agent.id),
      this.apiService.getInvoices(this.agent.id)
    ).subscribe(([orders, invoices]) => {
      this.orders = orders;
      this.invoices = invoices;
      this.pivot = this.helpers.leftJoin(orders, invoices);
      this.loadingVisible = false;
    },
      err => console.log(err));
  };

 viewInvoice(data: any):void {

  };
 viewOrder(data: any):void {

  };
  customizeSum(data: any): any {
    return new AppHelpersProvider().numberWithSpaces(data.value);
  };
  onSelectionChangedOrder(e):void{
      console.log(e);
      this.navCtrl.push(ItemsPage, {
          id: e.selectedRowsData[0].idDoc,
          type: 'order'
    });
  };
    onSelectionChangedInvoice(e):void{
      console.log(e);
      this.navCtrl.push(ItemsPage, {
          id: e.selectedRowsData[0].idDoc,
          type: 'invoice'
    });
  };
  selectViewOrder():void{
      this.navCtrl.push(ItemsPage, {
          id: this.idOrder,
          type: 'order'
    });
  };
  selectViewInvoice():void{
      this.navCtrl.push(ItemsPage, {
          id: this.idInvoice,
          type: 'order'
    });
  };
  onSelectionChangedPivot(e) {
    this.idOrder = e.selectedRowsData[0].idOrder;
    this.idInvoice = e.selectedRowsData[0].idInvoice;
    let alert = this.alertCtrl.create({
      title: 'Просмотр',
      message: 'Выберите тип документа для просмотра',
      buttons: [
        {
          text: 'Заказ',
          handler: this.selectViewOrder.bind(this)
        },
        {
          text: 'Накладная',
          handler: this.selectViewInvoice.bind(this)
        }
      ]
    });

    alert.present();
  }
}
