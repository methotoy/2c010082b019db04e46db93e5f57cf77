import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { AppServiceProvider } from './../../providers/app-service/app-service';
import { DomSanitizer } from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';

/**
 * Generated class for the ContactUsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {

  public lat: number = 24.9004144;
  public long: number = 67.1810212;

  public contactUsData = null;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private appService: AppServiceProvider,
    private sanitize: DomSanitizer,
    private call: CallNumber,
    private inAppBrowser: InAppBrowser,
    private appAvailability: AppAvailability,
    private platform: Platform,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.appService.getCms('contact-us')
      .subscribe(
      (response) => {
        let responseData = (response && response.length > 0) ? response[0] : response;
        if (typeof (responseData) && 'cmsContent' in responseData) {
          this.contactUsData = responseData.cmsContent.split('..').join('https://pizzacrust.com.pk');
        }
      },
      (error) => console.error(error)
      );
  }

  async callPizzaCrust(): Promise<any> {
    try {
      await this.call.callNumber('021 111127878', true);
    } catch (error) {
      console.error(error);
    }
  }

  sendEmail() {
    this.modalCtrl.create('SendEmailModalPage').present();
  }

  openFacebook() {
    this.inAppBrowser.create('https://www.facebook.com/PizzaCrustPk', '_system');
  }

  openInstagram() {
    this.inAppBrowser.create('https://www.instagram.com/pizzacrustpk', '_system');
  }

}
