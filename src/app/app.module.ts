import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';


import { MyApp } from './app.component';
import { FilterPopOverComponent } from './../components/filter-pop-over/filter-pop-over';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { Network } from '@ionic-native/network';

import { BaseProvider } from './../providers/base.service';
import { BannerServiceProvider } from '../providers/banner-service/banner-service';
import { CategoryServiceProvider } from '../providers/category-service/category-service';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { DealServiceProvider } from '../providers/deal-service/deal-service';
import { BuilderServiceProvider } from '../providers/builder-service/builder-service';
import { BranchServiceProvider } from '../providers/branch-service/branch-service';
import { AppServiceProvider } from '../providers/app-service/app-service';

@NgModule({
  declarations: [
    MyApp,
    FilterPopOverComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAcywEXMvUp7trmfpHrqz_XMJw9yYb50-E'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FilterPopOverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BaseProvider,
    BannerServiceProvider,
    CategoryServiceProvider,
    ProductServiceProvider,
    DealServiceProvider,
    BuilderServiceProvider,
    BranchServiceProvider,
    AppServiceProvider,
    CallNumber,
    InAppBrowser,
    AppAvailability,
    Network
  ]
})
export class AppModule { }
