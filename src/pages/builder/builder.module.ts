import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuilderPage } from './builder';
import { NetworkConnectionComponentModule } from './../../components/network-connection/network-connection.module';

@NgModule({
  declarations: [
    BuilderPage
  ],
  imports: [
    IonicPageModule.forChild(BuilderPage),
    NetworkConnectionComponentModule
  ],
  exports: [
    BuilderPage
  ]
})
export class BuilderPageModule {}
