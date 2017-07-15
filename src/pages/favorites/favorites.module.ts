import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritesPage } from './favorites';
import { PizcruHeaderComponentModule } from './../../components/pizcru-header/pizcru-header.module';

@NgModule({
  declarations: [
    FavoritesPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritesPage),
    PizcruHeaderComponentModule
  ],
  exports: [
    FavoritesPage
  ]
})
export class FavoritesPageModule {}
