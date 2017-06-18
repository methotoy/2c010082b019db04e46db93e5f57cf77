import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

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
})
export class ProductPage {
	private productId: number | string;
	public productName: string;
	private prevPageTitle: string;

	public products: Observable<Product[]>;
	public productHasData: boolean = false;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private viewCtrl: ViewController,
		private plt: Platform,
		private productService: ProductServiceProvider
	) {
		this.productId = navParams.get('productId');
		this.productName = navParams.get('productName');
		this.prevPageTitle = navParams.get('prevPageTitle');
	}

	ionViewWillEnter() {
		this.products = this.productService.product;
		this.productService.loadProduct(this.productId);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProductPage');
		if (this.plt.is('ios')) {
			this.viewCtrl.setBackButtonText(this.prevPageTitle);
		}
	}

	openProduct(id: number | string, name: string) {
    this.navCtrl.push('ProductDetailsPage', { productId: id, productName: name, prevPageTitle: this.productName });
  }

}
