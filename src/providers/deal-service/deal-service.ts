import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { BaseProvider } from './../base.service';
import { Deal } from '../../models/deal.interface';

/*
  Generated class for the BannerServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DealServiceProvider extends BaseProvider {
  deals: Observable<Deal[]>;

  hasData: boolean = false;

  private _deals: BehaviorSubject<Deal[]>;
  private dataStore: {
    deals: Deal[]
  };

  constructor(public http: Http) {
    super(http);
    this.dataStore = { deals: [] };
    this._deals = <BehaviorSubject<Deal[]>>new BehaviorSubject([]);
    this.deals = this._deals.asObservable();
  }

  loadAll() {
    this.get('/deals/getDeals.php')
      .map((res: Response) => res.json())
      .subscribe(
        (data) => {
          this.dataStore.deals = data;
          this._deals.next(Object.assign({}, this.dataStore).deals);
        },
        (error) => console.error('Could not load deals.',error),
        () => this.hasData = true
      );
  }
}        

