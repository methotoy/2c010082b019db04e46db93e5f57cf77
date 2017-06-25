import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { BaseProvider } from './../base.service';
import { Product } from '../../models/product.interface';
import { Filter } from './../../models/filter.interface';

/*
  Generated class for the BannerServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductServiceProvider extends BaseProvider {
  product: Observable<Product[]>;
  filter: Observable<Filter[]>;

  hasData: boolean = false;

  private _product: BehaviorSubject<Product[]>;
  private _filter: BehaviorSubject<Filter[]>;
  private dataStore: {
    product: Product[],
    filter: Filter[]
  };
  private productId: number | string = null;

  constructor(public http: Http) {
    super(http);
    this.dataStore = { product: [], filter: [] };
    this._product = <BehaviorSubject<Product[]>>new BehaviorSubject([]);
    this._filter = <BehaviorSubject<Filter[]>>new BehaviorSubject([]);
    this.product = this._product.asObservable();
    this.filter = this._filter.asObservable();
  }

  loadProduct(id) {
    if(this.productId === id) {
      console.log('Equal');
      this.hasData = true;
      return;
    }
    this.productId = id;
    this.hasData = false;
    this.get(`/product/getProduct.php?productId=${id}`)
      .map((res: Response) => res.json())
      .subscribe(
        (data) => {
          this.dataStore.product = data;
          this._product.next(Object.assign({}, this.dataStore).product);
        },
        (error) => console.error('Could not load product.',error),
        () => {
          this.hasData = true;
        }
      );
  }

  loadFilter(id) {
    this.get(`/filter/getProductFilter.php?categoryId=${id}`)
      .map((res: Response) => res.json())
      .subscribe(
        (data) => {
          this.dataStore.filter = data;
          this._filter.next(Object.assign({}, this.dataStore).filter);
        },
        (error) => console.error('Could not load product filter.',error)
      );
  }
}        

