import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartComponent } from './cart';

@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    IonicPageModule.forChild(CartComponent),
  ],
  exports: [
    CartComponent
  ]
})
export class CartComponentModule {}
