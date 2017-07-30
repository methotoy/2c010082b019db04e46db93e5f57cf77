import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';
import { PizcruHeaderComponentModule } from './../../components/pizcru-header/pizcru-header.module';
import { NetworkConnectionComponentModule } from './../../components/network-connection/network-connection.module';

@NgModule({
  declarations: [
    ProductPage
  ],
  imports: [
    IonicPageModule.forChild(ProductPage),
    PizcruHeaderComponentModule,
    NetworkConnectionComponentModule
  ],
  exports: [
    ProductPage
  ]
})
export class ProductPageModule {}
