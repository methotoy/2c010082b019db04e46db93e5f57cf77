import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Observable } from 'rxjs';

import { BannerServiceProvider } from './../../providers/banner-service/banner-service';

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
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  public banners: Observable<Array<any>>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bannerService: BannerServiceProvider
  ) { }

  ionViewWillEnter() {
    this.banners = this.bannerService.getBanner();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  slideChanged() {
    this.slides.startAutoplay();
  }

}
