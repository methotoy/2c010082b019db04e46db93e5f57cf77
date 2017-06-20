import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams, Platform } from 'ionic-angular';

import { ProductServiceProvider } from './../../providers/product-service/product-service';
import { DealServiceProvider } from './../../providers/deal-service/deal-service';
import { Product } from './../../models/product.interface';
import { Deal } from './../../models/deal.interface';
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
export class ProductDetailsPage implements OnInit {
  private productId: number | string;
  public productName: string;
  public prevPageTitle: string;
  public productType: string = null;

  public product: Product[] | Deal[];

  // For Products Like Pizza etc.
  public sizeSelected: string;
  public quantitySelected: number = 1;

  // For Deals
  public selectedDeal: any[] = [];
  public limitDeal: any[] = [];

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private plt: Platform,
    private productService: ProductServiceProvider,
    private dealService: DealServiceProvider
  ) {
    this.productId = navParams.get('productId');
    this.productName = navParams.get('productName');
    this.prevPageTitle = navParams.get('prevPageTitle');
    this.productType = (navParams.get('type')) ? navParams.get('type') : null;
  }

  ngOnInit() {
    if (this.productType && this.productType === 'deals') {
      this.product = Observable.from(this.dealService.deals)
        .mergeAll()
        .filter((data) => data.dealID === this.productId);

        Observable.from(this.dealService.deals)
          .flatMap((res) => res)
          .filter((data) => data.dealID === this.productId)
          .subscribe(
            (data) => {
              this.limitDeal = data.numberofitem
              if(data.numberofitem) {
                for(let key in data.numberofitem) {
                  for(let i = 0; i < parseInt(data.numberofitem[key]); i++) {
                    this.selectedDeal.push({ id: key, productId: null});
                  }
                }
              }
            }
          )
    } else {
      this.product = Observable.from(this.productService.product)
        .mergeAll()
        .filter((data) => data.iProductId === this.productId);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  getSizes(data) {
    let tempData = JSON.parse(data);
    if (tempData && !this.sizeSelected) {
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

  updateSelectedDealProduct(data: Product) {
    // let limit = parseInt(this.limitDeal[data.iCategoryId]);
    // if()
    let exist = this.selectedDeal.findIndex(item => item.id === data.iCategoryId && item.productId === data.iProductId);
    let index = this.selectedDeal.findIndex(item => item.id === data.iCategoryId && item.productId === null);
    if(exist < 0 && index > -1) {
      this.selectedDeal[index].productId = data.iProductId;
    } else {
      if( exist < 0) {
        index = this.selectedDeal.findIndex(item => item.id === data.iCategoryId && item.productId !== data.iProductId);
        this.selectedDeal[index].productId = data.iProductId;
      } else {
        this.selectedDeal[exist].productId = null;
      }
    }
    console.log(this.selectedDeal,index);
  }

  convertToArray(data) {
    if (typeof data) {
      let tempData = [];
      for (let key in data) {
        if (data.hasOwnProperty(key) && data[key].length > 0) {
          tempData.push(parseInt(data[key]));
        }
      }

      tempData.sort();
      return tempData.reverse();
    }

    return data;
  }

  checkSelected(data) {
    let exist = this.selectedDeal.findIndex(item => item.id === data.iCategoryId && item.productId === data.iProductId);

    return (exist > -1)? true : false;
  }

  checkLimit() {
    let limit = this.selectedDeal.findIndex(item => item.productId === null);
    return (limit > -1)? true : false;
  }

}
