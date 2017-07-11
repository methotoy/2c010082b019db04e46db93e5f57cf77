import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { BannerServiceProvider } from './../../providers/banner-service/banner-service';
import { DealServiceProvider } from './../../providers/deal-service/deal-service';
import { AppServiceProvider } from './../../providers/app-service/app-service';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  @ViewChild(Slides) slides: Slides;

  public banners: Observable<Array<any>>;
  public sliders: Observable<Array<any>>;
  private sliderData: any[] = [];
  public sliderHasData: boolean = false;

  public email: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bannerService: BannerServiceProvider,
    private dealService: DealServiceProvider,
    private appService: AppServiceProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.banners = this.bannerService.getBanner();
    this.bannerService.getSlider()
      .subscribe(data => {
        this.onSliderEmitted(data);
      });
  }

  onSliderEmitted(data) {
    this.sliders = data;
    this.sliderData = data;
    if (!data || !data.length) {
      this.sliderHasData = false;
    } else {
      this.sliderHasData = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  slideChanged() {
    this.slides.startAutoplay();
  }

  clickSlider(data?) {
    let link = '';
    if (data) {
      link = data.bannerLink;
    } else {
      let sliderNumber = this.slides.getActiveIndex() - 1;
      if (this.slides.getActiveIndex() === 4) {
        sliderNumber = 0;
      } else if (this.slides.getActiveIndex() === 0) {
        sliderNumber = 2;
      }

      if (this.sliderData.length > 0 && this.sliderData[sliderNumber]) {
        link = this.sliderData[sliderNumber].bannerLink;
      }
    }

    link = link.replace("https://pizzacrust.com.pk/", "");
    if (link.includes('id') && (link = link.replace("deals.php?id=", ""))) {
      this.navCtrl.push('DealsPage', { productId: link, prevPageTitle: 'Home' });
      this.navCtrl.canGoBack();
      this.navCtrl.canSwipeBack();
    } else {
      this.navCtrl.push('DealsPage', { prevPageTitle: 'Home' });
    }
  }

  signUp() {
    this.alertCtrl.create({
      title: 'Subscribe',
      inputs: [
        { name: 'email', placeholder: 'Enter Email Address', type: 'email' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Subscribe', handler: data => {
          let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          if(data && regExp.test(data.email)) {
            this.appService.postSubscriber(data)
              .subscribe(
                (response) => {
                  let toast: any;
                  if(status) {
                    toast = this.toastCtrl.create({
                      message: response.msg,
                      duration: 2000,
                      position: 'bottom'
                    });
                  } else {
                    toast = this.toastCtrl.create({
                      message: response.msg,
                      duration: 2000,
                      position: 'bottom'
                    })
                  }

                  toast.present();
                },
                (error) => console.error(error),
                () => console.log('Done!')
              );
          } else {
            this.toastCtrl.create({
              message: 'Invalid Email Format!',
              duration: 2000,
              position: 'bottom'
            }).present();
          }
        } }
      ]
    }).present();
  }

}
