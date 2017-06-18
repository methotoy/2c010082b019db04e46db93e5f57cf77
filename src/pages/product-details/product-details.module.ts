import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailsPage } from './product-details';
import { PizcruHeaderComponentModule } from './../../components/pizcru-header/pizcru-header.module';

@NgModule({
  declarations: [
    ProductDetailsPage
  ],
  imports: [
    IonicPageModule.forChild(ProductDetailsPage),
    PizcruHeaderComponentModule
  ],
  exports: [
    ProductDetailsPage
  ]
})
export class ProductDetailsPageModule {}
