import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BaseProvider {

	private baseApiUrl: string = 'http://api.pizzacrust.dev';
	// private baseApiUrl: string = 'http://192.168.8.102';
	// private baseApiUrl: string = 'http://192.168.254.4';
	
	//private authToken: string = '';

	constructor(public http: Http) { }

	get(url) {
		return this.http.get(this.baseApiUrl + url)
	}

	post(url, body) {
		return this.http.post(this.baseApiUrl + url, body);
	}
}
