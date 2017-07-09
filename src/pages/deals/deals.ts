import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
export class DealsPage implements OnInit {

  public deals: Observable<Deal[]>;
  public selectedFilterId: number = 1;

  public pageTitle: string = 'Deals';
  public prevPageTitle: string = null;
  public productId: number | string = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dealService: DealServiceProvider
  ) {
    this.prevPageTitle = navParams.get('prevPageTitle') || null;
    this.productId = navParams.get('productId') || null;
  }

  ngOnInit() {
    this.deals = this.dealService.deals;
    this.dealService.loadAll();
    if(this.productId) {
      this.filter(this.productId);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealsPage');
  }

  openProduct(id: number | string, name: string) {
		this.navCtrl.push('ProductDetailsPage', { productId: id, productName: name, prevPageTitle: 'Deals', type: 'deals' });
    this.navCtrl.canGoBack();
		this.navCtrl.canSwipeBack();
  }

  filter(id) {
    if(id){
			let filterId = parseInt(id);
			if(this.selectedFilterId !== filterId) {
				if(this.selectedFilterId !== filterId && filterId !== 1) {
					this.deals = Observable.from(this.dealService.deals)
						.map((data) => data.filter(a => a.dealFilter === filterId.toString()));
					} else {	
					this.deals = Observable.from(this.dealService.deals)
						.map((data) => data.filter(a => a.dealFilter !== filterId.toString()));
				}
				this.selectedFilterId = filterId;
			} else {
				this.deals = Observable.from(this.dealService.deals)
						.map((data) => data.filter(a => a.dealFilter !== filterId.toString()));
			}
		}
  }

}
