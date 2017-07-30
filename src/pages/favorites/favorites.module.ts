import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritesPage } from './favorites';
import { PizcruHeaderComponentModule } from './../../components/pizcru-header/pizcru-header.module';
import { NetworkConnectionComponentModule } from './../../components/network-connection/network-connection.module';

@NgModule({
  declarations: [
    FavoritesPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritesPage),
    PizcruHeaderComponentModule,
    NetworkConnectionComponentModule
  ],
  exports: [
    FavoritesPage
  ]
})
export class FavoritesPageModule {}
