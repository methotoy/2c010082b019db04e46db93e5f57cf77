import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
})
export class CategoryPage implements OnInit {

  public categories: Observable<Category[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private categoryService: CategoryServiceProvider
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

}
