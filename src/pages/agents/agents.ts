import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {OrdersApiProvider} from '../../providers/orders-api';
import { OrdersPage } from '../orders/orders';
/**
 * Generated class for the AgentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-agents',
  templateUrl: 'agents.html',
})
export class AgentsPage {

  agents:string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private serviceAPI:OrdersApiProvider) {
  }

    ngOnInit() {
      this.refresh();
    };

      refresh(): void {
    this.serviceAPI.getAgents().subscribe(
      data => {
        this.agents = data;
      },
      error => {
        console.log(error);
      }
    );
  };

  itemSelected(agent):void{

    this.navCtrl.push(OrdersPage, {
      agent: agent
    });

  };

}
