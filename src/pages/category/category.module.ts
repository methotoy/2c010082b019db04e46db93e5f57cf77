import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPage } from './category';
import { NetworkConnectionComponentModule } from './../../components/network-connection/network-connection.module';

@NgModule({
  declarations: [
    CategoryPage
  ],
  imports: [
    IonicPageModule.forChild(CategoryPage),
    NetworkConnectionComponentModule
  ],
  exports: [
    CategoryPage
  ]
})
export class CategoryPageModule {}
