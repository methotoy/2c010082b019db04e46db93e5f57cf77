import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, Platform } from 'ionic-angular';

import { ProductServiceProvider } from './../../providers/product-service/product-service';
import { Product } from './../../models/product.interface';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html'
})
export class ProductDetailsPage {
  private productId: number | string;
  public productName: string;
  public prevPageTitle: string;

  public product: Product[];

  public sizeSelected: string;
  public quantitySelected: number = 1;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private plt: Platform,
    private productService: ProductServiceProvider
  ) {
    this.productId = navParams.get('productId');
    this.productName = navParams.get('productName');
    this.prevPageTitle = navParams.get('prevPageTitle');
  }

  ionViewWillEnter(){
    this.productService.loadProduct(1);
    this.product = Observable.from(this.productService.product)
      .mergeAll()
      .filter((data) => data.iProductId === this.productId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }
  
  getSizes(data) {
    let tempData = JSON.parse(data);
    if(tempData && !this.sizeSelected) { 
      this.sizeSelected = tempData[0].vName;
    }
    return tempData;
  }

  updateSizeSelected(sizeName) {
    this.sizeSelected = sizeName;
  }

  updateQuantitySelected(quantity) {
    this.quantitySelected = quantity;
  }

}
