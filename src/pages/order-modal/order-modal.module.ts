import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderModal } from './order-modal';

@NgModule({
  declarations: [
    OrderModal,
  ],
  imports: [
    IonicPageModule.forChild(OrderModal),
  ],
  exports: [
    OrderModal
  ]
})
export class OrderModalModule { }
