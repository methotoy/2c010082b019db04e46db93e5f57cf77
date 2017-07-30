import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsOfUsePage } from './terms-of-use';
import { NetworkConnectionComponentModule } from './../../components/network-connection/network-connection.module';

@NgModule({
  declarations: [
    TermsOfUsePage,
  ],
  imports: [
    IonicPageModule.forChild(TermsOfUsePage),
    NetworkConnectionComponentModule
  ],
  exports: [
    TermsOfUsePage
  ]
})
export class TermsOfUsePageModule {}
