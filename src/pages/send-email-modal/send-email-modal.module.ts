import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendEmailModalPage } from './send-email-modal';

@NgModule({
  declarations: [
    SendEmailModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SendEmailModalPage),
  ],
  exports: [
    SendEmailModalPage
  ]
})
export class SendEmailModalPageModule {}
