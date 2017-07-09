import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from './../../providers/app-service/app-service';
import { DomSanitizer } from '@angular/platform-browser';

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
    private sanitize: DomSanitizer
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

}
