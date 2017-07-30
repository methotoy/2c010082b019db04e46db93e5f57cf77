import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutModal } from './checkout-modal';
import { NetworkConnectionComponentModule } from './../../components/network-connection/network-connection.module';

@NgModule({
  declarations: [
    CheckoutModal,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutModal),
    NetworkConnectionComponentModule
  ],
  exports: [
    CheckoutModal
  ]
})
export class CheckoutModalModule {}
