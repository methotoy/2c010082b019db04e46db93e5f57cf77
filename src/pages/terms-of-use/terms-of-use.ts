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
          this.termsOfUseData = this.termsOfUseData.split('<p>&nbsp;</p>').join('');
          this.termsOfUseData = this.termsOfUseData.split('Website').join('Mobile Application');
          this.termsOfUseData = this.termsOfUseData.split('Web site').join('Mobile Application');
          this.termsOfUseData = this.termsOfUseData.split('by clicking on the “Terms of Use” located at the bottom of the pages').join("on 'Terms of Use' page");
          this.termsOfUseData = this.termsOfUseData.split('AND/OR VISITING THIS WEBSITE').join("THIS MOBILE APPLICATION");
          this.termsOfUseData = this.termsOfUseData.split('Pizzacrust.com.pk domain name').join("application");
          this.termsOfUseData = this.termsOfUseData.split('computer').join("device");
          this.termsOfUseData = this.termsOfUseData.split('web site').join("application");
          this.termsOfUseData = this.termsOfUseData.split('website').join("application");
        }
      },
      (error) => console.error(error)
      );
  }

}
