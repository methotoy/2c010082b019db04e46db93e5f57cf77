import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BaseProvider {
	
	private baseApiUrl: string = 'http://api.secret.com.pk';
	
	//private authToken: string = '';

	constructor(public http: Http) { }

	get(url) {
		return this.http.get(this.baseApiUrl + url)
	}

	post(url, body) {
		return this.http.post(this.baseApiUrl + url, body);
	}
}
