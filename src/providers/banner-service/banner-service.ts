import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';

import { BaseProvider } from './../base.service';

/*
  Generated class for the BannerServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BannerServiceProvider extends BaseProvider {

  constructor(public http: Http) {
    super(http);
  }

  getBanner(): Observable<any> {
    return this.get('/banner/getBanner.php?type=1')
      .map((res: Response) => res.json());
  }

  getSlider(): Observable<any> {
    return this.get('/banner/getBanner.php?type=2')
      .map((res: Response) => res.json());
  }
}        
