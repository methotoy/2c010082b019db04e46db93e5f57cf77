import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AppServiceProvider } from './../../providers/app-service/app-service';

/**
 * Generated class for the SendEmailModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-send-email-modal',
  templateUrl: 'send-email-modal.html',
})
export class SendEmailModalPage {

  public name: string = null;
  public email: string = null;
  public subject: string = null;
  public message: string = null;
  public submitEmail: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private appService: AppServiceProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendEmailModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  sendEmail() {
    let reg = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,6})$/;
    this.submitEmail = true;

    if (this.email) {
      if (!reg.test(this.email)) {
        this.toastCtrl.create({
          message: 'Email is in invalid format!',
          duration: 4000,
          position: 'bottom'
        }).present();
        this.submitEmail = false;
        return;
      } else {
        let data = [{
          author: this.name,
          email: this.email,
          website: this.subject,
          comment: this.message
        }];
        this.appService.postSendEmail(data)
          .subscribe(
          (response) => {
            this.toastCtrl.create({
              message: response.msg,
              duration: 4000,
              position: 'bottom'
            }).present();

            if(response.status) {
              this.viewCtrl.dismiss();
            }
          },
          (error) => console.error(error),
          () => this.submitEmail = false
          );
      }
    }
  }

  validFields() {
    return (this.name && this.email && this.subject && this.message) ? true : false;
  }

}
