import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';

import { BaseProvider } from './../base.service';

/*
  Generated class for the BranchServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BranchServiceProvider extends BaseProvider {

   constructor(public http: Http) {
    super(http);
  }

  getBranch(): Observable<any> {
    return this.get('/branch/getBranch.php')
      .map((res: Response) => res.json());
  }

  postOrder(data) {
    return this.post('/order/postOrder.php', JSON.stringify(data))
      .map((res: Response) => res.json());
  }

}
