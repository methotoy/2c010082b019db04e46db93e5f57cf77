import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { BaseProvider } from './../base.service';
import { Category } from '../../models/category.interface';

/*
  Generated class for the BannerServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CategoryServiceProvider extends BaseProvider {
  category: Observable<Category[]>;
  hasData: boolean = false;

  private _category: BehaviorSubject<Category[]>;
  private dataStore: {
    category: Category[]
  };

  constructor(public http: Http) {
    super(http);
    this.dataStore = { category: [] };
    this._category = <BehaviorSubject<Category[]>>new BehaviorSubject([]);
    this.category = this._category.asObservable();
  }

  loadAll() {
    this.get('/category/getCategory.php')
      .map((res: Response) => res.json())
      .subscribe(
        (data) => {
          this.dataStore.category = data;
          this._category.next(Object.assign({}, this.dataStore).category);
        },
        (error) => console.error('Could not load category.',error),
        () => this.hasData = true
      );
  }
}        

