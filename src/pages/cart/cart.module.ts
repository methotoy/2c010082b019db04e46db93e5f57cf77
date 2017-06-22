import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartPage } from './cart';
import { PizcruHeaderComponentModule } from './../../components/pizcru-header/pizcru-header.module';

@NgModule({
  declarations: [
    CartPage,
  ],
  imports: [
    IonicPageModule.forChild(CartPage),
    PizcruHeaderComponentModule
  ],
  exports: [
    CartPage
  ]
})
export class CartPageModule {}
