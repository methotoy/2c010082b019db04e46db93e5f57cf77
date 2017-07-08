import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { BaseProvider } from './../base.service';

/*
  Generated class for the AppServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppServiceProvider extends BaseProvider {

   constructor(public http: Http) {
    super(http);
  }

  getCms() {
    return this.get('/cms/getCms.php')
      .map((res: Response) => res.json());
  }

  postSubscriber(data) {
    return this.post('/subscribe/postSubscriber.php',JSON.stringify(data))
      .map((res: Response) => res.json());
  }

}
