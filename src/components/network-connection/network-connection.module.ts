import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkConnectionComponent } from './network-connection';

@NgModule({
  declarations: [
    NetworkConnectionComponent,
  ],
  imports: [
    IonicPageModule.forChild(NetworkConnectionComponent),
  ],
  exports: [
    NetworkConnectionComponent
  ]
})
export class NetworkConnectionComponentModule {}
