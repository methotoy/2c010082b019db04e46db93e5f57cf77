import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactUsPage } from './contact-us';
import { AgmCoreModule } from '@agm/core';
import { NetworkConnectionComponentModule } from './../../components/network-connection/network-connection.module';

@NgModule({
  declarations: [
    ContactUsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactUsPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAcywEXMvUp7trmfpHrqz_XMJw9yYb50-E'
    }),
    NetworkConnectionComponentModule
  ],
  exports: [
    ContactUsPage
  ]
})
export class ContactUsPageModule {}
