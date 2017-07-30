import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealsPage } from './deals';
import { PizcruHeaderComponentModule } from './../../components/pizcru-header/pizcru-header.module';
import { NetworkConnectionComponentModule } from './../../components/network-connection/network-connection.module';

@NgModule({
  declarations: [
    DealsPage,
  ],
  imports: [
    IonicPageModule.forChild(DealsPage),
    PizcruHeaderComponentModule,
    NetworkConnectionComponentModule
  ],
  exports: [
    DealsPage
  ]
})
export class DealsPageModule {}
