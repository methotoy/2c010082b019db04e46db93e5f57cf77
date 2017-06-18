import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DealServiceProvider } from './../../providers/deal-service/deal-service';
import { Observable } from 'rxjs';
import { Deal } from './../../models/deal.interface';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-deals',
  templateUrl: 'deals.html',
})
export class DealsPage implements OnInit {

  public deals: Observable<Deal[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dealService: DealServiceProvider
  ) { }

  ngOnInit() {
    this.deals = this.dealService.deals;
    this.dealService.loadAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealsPage');
  }

  openProduct(id: number | string, name: string) {
		this.navCtrl.push('ProductDetailsPage', { productId: id, productName: name, prevPageTitle: 'Deals', type: 'deals' });
    this.navCtrl.canGoBack();
		this.navCtrl.canSwipeBack();
  }

}
