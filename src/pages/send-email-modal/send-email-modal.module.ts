import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendEmailModalPage } from './send-email-modal';
import { NetworkConnectionComponentModule } from './../../components/network-connection/network-connection.module';

@NgModule({
  declarations: [
    SendEmailModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SendEmailModalPage),
    NetworkConnectionComponentModule
  ],
  exports: [
    SendEmailModalPage
  ]
})
export class SendEmailModalPageModule {}
