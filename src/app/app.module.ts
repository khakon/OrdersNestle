import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { AgentsPage } from '../pages/agents/agents';
import { OrdersPage } from '../pages/orders/orders';
import { ItemsPage } from '../pages/items/items';
import { AppConfigProvider } from '../providers/app-config';
import { AppHelpersProvider } from '../providers/app-helpers';
import { OrdersApiProvider } from '../providers/orders-api';
import { DxDataGridModule, DxButtonModule, DxLoadPanelModule, DxPopupModule, DxSelectBoxModule, DxTextAreaModule, DxFormModule, DxSchedulerModule, DxTemplateModule, DxChartModule, } from 'devextreme-angular';

@NgModule({
  declarations: [
    MyApp,
    AgentsPage,
    OrdersPage,
    ItemsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    DxButtonModule,
    DxDataGridModule,
    DxLoadPanelModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxTemplateModule,
    DxSchedulerModule,
    DxChartModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AgentsPage,
    OrdersPage,
    ItemsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppConfigProvider,
    OrdersApiProvider,
    AppHelpersProvider
  ]
})
export class AppModule {}
