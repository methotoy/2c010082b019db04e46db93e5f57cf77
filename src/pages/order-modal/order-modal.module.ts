import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderModal } from './order-modal';
import { NetworkConnectionComponentModule } from './../../components/network-connection/network-connection.module';

@NgModule({
  declarations: [
    OrderModal,
  ],
  imports: [
    IonicPageModule.forChild(OrderModal),
    NetworkConnectionComponentModule
  ],
  exports: [
    OrderModal
  ]
})
export class OrderModalModule { }
