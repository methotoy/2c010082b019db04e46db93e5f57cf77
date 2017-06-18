import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { BaseProvider } from './../base.service';
import { Product } from '../../models/product.interface';

/*
  Generated class for the BannerServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductServiceProvider extends BaseProvider {
  product: Observable<Product[]>;

  private _product: BehaviorSubject<Product[]>;
  private dataStore: {
    product: Product[]
  };

  constructor(public http: Http) {
    super(http);
    this.dataStore = { product: [] };
    this._product = <BehaviorSubject<Product[]>>new BehaviorSubject([]);
    this.product = this._product.asObservable();
  }

  loadProduct(id) {
    this.get(`/product/getProduct.php?productId=${id}`)
      .map((res: Response) => res.json())
      .subscribe(
        (data) => {
          this.dataStore.product = data;
          this._product.next(Object.assign({}, this.dataStore).product);
        },
        (error) => console.error('Could not load product.',error)
      );
  }
}        

