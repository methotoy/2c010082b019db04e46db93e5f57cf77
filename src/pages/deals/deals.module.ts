import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealsPage } from './deals';
import { PizcruHeaderComponentModule } from './../../components/pizcru-header/pizcru-header.module';

@NgModule({
  declarations: [
    DealsPage,
  ],
  imports: [
    IonicPageModule.forChild(DealsPage),
    PizcruHeaderComponentModule
  ],
  exports: [
    DealsPage
  ]
})
export class DealsPageModule {}
