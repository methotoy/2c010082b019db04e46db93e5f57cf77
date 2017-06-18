import { Component, Input, OnInit } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';

/**
 * Generated class for the PizcruHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'pizcru-header',
  templateUrl: 'pizcru-header.html'
})
export class PizcruHeaderComponent implements OnInit {

  @Input() pageTitle: string = "Test";
  @Input() prevPageTitle: string = "Test2";

  constructor(
    private plt: Platform,
    private viewCtrl: ViewController
  ) {}

  ngOnInit() {
    if (this.plt.is('ios')) {
      this.viewCtrl.setBackButtonText(this.prevPageTitle);
    }
  }

}
