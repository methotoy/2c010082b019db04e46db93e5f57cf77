import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BaseProvider } from './../providers/base.service';
import { BannerServiceProvider } from '../providers/banner-service/banner-service';
import { CategoryServiceProvider } from '../providers/category-service/category-service';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { DealServiceProvider } from '../providers/deal-service/deal-service';
import { BuilderServiceProvider } from '../providers/builder-service/builder-service';

import { FilterPopOverComponent } from './../components/filter-pop-over/filter-pop-over';
import { BranchServiceProvider } from '../providers/branch-service/branch-service';

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
    IonicStorageModule.forRoot()
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
    BranchServiceProvider
  ]
})
export class AppModule { }
