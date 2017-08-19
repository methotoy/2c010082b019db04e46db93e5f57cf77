import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { ProductServiceProvider } from './../../providers/product-service/product-service';
import { Filter } from './../../models/filter.interface';
import { Observable } from 'rxjs';

@Component({
  template: 
    `<ion-list radio-group [(ngModel)]="selectedValue" style="margin-bottom:0;">
      <ion-item>
        <ion-label>All</ion-label>
        <ion-radio value="-1" (click)="closePopOver(-1)" checked="-1 === selectedValue"></ion-radio>
      </ion-item>

      <ion-item *ngFor="let item of (filterItems | async)">
        <ion-label>{{ item.proTypeName }}</ion-label>
        <ion-radio value="{{ item.proTypeID }}" (click)="closePopOver(item.proTypeID)" checked="parseInt(item.proTypeID) === selectedValue"></ion-radio>
      </ion-item>
    </ion-list>`
})
export class FilterPopOverComponent implements OnInit {
  
  filterItems: Observable<Filter[]>;
  selectedValue: number = 1;
  prodCatID: number | string;

  constructor(
    private viewCtrl: ViewController,
    private params: NavParams,
    private productService: ProductServiceProvider
    ) {}

  ngOnInit() {
    this.selectedValue = this.params.get('selectedValue')? this.params.get('selectedValue') : this.selectedValue;
    this.prodCatID = this.params.get('prodCatID');
    this.filterItems = this.productService.filter;
  }

  closePopOver() {
    this.viewCtrl.dismiss(this.selectedValue);
  }

}
