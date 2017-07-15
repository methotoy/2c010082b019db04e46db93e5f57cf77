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

  googleMap() {
    let url = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3618.9311883545533!2d67.1787977!3d24.9003287!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb339dc5c757dad%3A0xff59eb7d39985372!2sPizza+Crust!5e0!3m2!1sen!2s!4v1484722351573';
    return this.sanitize.bypassSecurityTrustResourceUrl(url);
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

  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {
    let app: string;

    if (this.platform.is('ios')) {
      app = iosSchemaName;
    } else if (this.platform.is('android')) {
      app = androidPackageName;
    } else {
      this.inAppBrowser.create(httpUrl + username, '_system');
      return;
    }

    this.appAvailability.check(app).then(
      () => { // success callback
        this.inAppBrowser.create(appUrl + username, '_system');
      },
      () => { // error callback
        this.inAppBrowser.create(httpUrl + username, '_system');
      }
    );
  }

  openFacebook() {
    this.launchExternalApp('fb://', 'com.facebook.katana', 'fb://profile/', 'https://www.facebook.com/', 'PizzaCrustPk');
  }

  openInstagram() {
    this.launchExternalApp('instagram://', 'com.instagram.android', 'instagram://user?username=', 'https://www.instagram.com/', 'pizzacrustpk');
  }

}
