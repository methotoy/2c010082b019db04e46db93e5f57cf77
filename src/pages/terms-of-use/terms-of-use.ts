import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { AppServiceProvider } from './../../providers/app-service/app-service';

/**
 * Generated class for the TermsOfUsePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-terms-of-use',
  templateUrl: 'terms-of-use.html',
  animations: [
    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style([{
        opacity: 0, display: 'none'
      }])),
      transition('* => *', animate('1s'))
    ])
  ]
})
export class TermsOfUsePage implements OnInit {

  public termsOfUseData = null;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private appService: AppServiceProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsOfUsePage');
  }

  ngOnInit() {
    this.appService.getCms('terms-of-use')
      .subscribe(
      (response) => {
        let responseData = (response && response.length > 0) ? response[0] : response;
        if (typeof (responseData) && 'cmsContent' in responseData) {
          this.termsOfUseData = responseData.cmsContent.split('..').join('https://pizzacrust.com.pk');
        }
      },
      (error) => console.error(error)
      );
  }

}
