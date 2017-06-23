import { Component, OnInit, Directive } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BuilderServiceProvider } from './../../providers/builder-service/builder-service';

/**
 * Generated class for the BuilderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-builder',
  templateUrl: 'builder.html',
})
export class BuilderPage implements OnInit {

  public builderData: any[] = [];
  public builderHasData: boolean = false;

  constructor(
    private builderService: BuilderServiceProvider
  ) {
  }

  ngOnInit() {
    this.getBuilderData();
  }

  getBuilderData() {
    this.builderService.getBuilder()
      .subscribe(
        (response) => this.builderData = response,
        (error) => console.error(error),
        () => console.log(this.builderData)
        // () => this.builderHasData = true
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuilderPage');
  }

}
