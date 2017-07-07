import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { BannerServiceProvider } from './../../providers/banner-service/banner-service';
import { DealServiceProvider } from './../../providers/deal-service/deal-service';

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
    private alertCtrl: AlertController
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
      this.dealService.loadAll();
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
          if(data) {
            console.log(data);
          }
        } }
      ]
    }).present();
  }

}
