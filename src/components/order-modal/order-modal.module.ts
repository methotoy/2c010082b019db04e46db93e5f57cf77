import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderModalComponent } from './order-modal';

@NgModule({
  declarations: [
    OrderModalComponent,
  ],
  imports: [
    IonicPageModule.forChild(OrderModalComponent),
  ],
  exports: [
    OrderModalComponent
  ]
})
export class OrderModalComponentModule {}
