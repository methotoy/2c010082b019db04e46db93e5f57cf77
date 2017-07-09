import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { CategoryServiceProvider } from './../../providers/category-service/category-service';
import { Observable } from 'rxjs';
import { Category } from './../../models/category.interface';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
  animations: [
		trigger('fade', [
			state('visible', style({
				opacity: 1
			})),
			state('invisible', style([{
				opacity: 0, display: 'none'
			}])),
			transition('* => *', animate('1s'))
		])
	]
})
export class CategoryPage implements OnInit {

  public categories: Observable<Category[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoryService: CategoryServiceProvider
  ) { }

  ngOnInit() {
    this.categories = this.categoryService.category;
    this.categoryService.loadAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  deleteSpace(data) {
    data = data.replace(" ", "");
    return data.toLowerCase();
  }

  openProduct(id: number | string, name: string) {
    this.navCtrl.push('ProductPage', { productId: id, productName: name, prevPageTitle: 'Categories' });
    this.navCtrl.canGoBack();
		this.navCtrl.canSwipeBack();
  }

  isEmptyData(data) {
    return (data === 'null');
  }

}
