import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutModal } from './checkout-modal';

@NgModule({
  declarations: [
    CheckoutModal,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutModal),
  ],
  exports: [
    CheckoutModal
  ]
})
export class CheckoutModalModule {}
