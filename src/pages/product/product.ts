import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { ProductServiceProvider } from './../../providers/product-service/product-service';
import { Observable } from 'rxjs';
import { Product } from './../../models/product.interface';

/**
 * Generated class for the ProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-product',
	templateUrl: 'product.html',
	animations: [
		trigger('fade', [
			state('visible', style({
				opacity: 1
			})),
			state('invisible', style([{
				opacity: 0, display: 'none'
			}])),
			transition('* => *', animate('.5s'))
		])
	]
})
export class ProductPage implements OnInit {
	public productId: number | string;
	public productName: string;
	public prevPageTitle: string;
	public selectedFilterId: number = 1;

	public products: Observable<Product[]>;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private viewCtrl: ViewController,
		private plt: Platform,
		public productService: ProductServiceProvider
	) {
		this.productId = navParams.get('productId');
		this.productName = navParams.get('productName');
		this.prevPageTitle = navParams.get('prevPageTitle');
	}

	ngOnInit() {
		this.productService.loadProduct(this.productId);
		this.filter(1);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProductPage');
		if (this.plt.is('ios')) {
			this.viewCtrl.setBackButtonText(this.prevPageTitle);
		}
	}

	openProduct(id: number | string, name: string) {
		this.navCtrl.push('ProductDetailsPage', { productId: id, productName: name, prevPageTitle: this.productName });
		this.navCtrl.canGoBack();
		this.navCtrl.canSwipeBack();
	}

	filter(id) {
		if (id) {
			let filterId = parseInt(id);
			if (this.selectedFilterId !== filterId) {
				if (this.selectedFilterId !== filterId && filterId !== 1) {
					this.products = Observable.from(this.productService.product)
						.map((data) => data.filter(a => a.Product_type === filterId.toString()));
				} else {
					this.products = Observable.from(this.productService.product)
						.map((data) => data.filter(a => a.Product_type !== filterId.toString()));
				}
				this.selectedFilterId = filterId;
			} else {
				this.products = Observable.from(this.productService.product)
					.map((data) => data.filter(a => a.Product_type !== filterId.toString()));
			}
		}
	}
}
