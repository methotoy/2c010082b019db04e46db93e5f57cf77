import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-modal',
  templateUrl: 'order-modal.html',
})
export class OrderModal {

  public size: any[] = [];
  public sauce: any[] = [];
  public cheese: any[] = [];
  public topping: any[] = [];

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams
  ) {
    this.size = navParams.get('size');
    this.sauce = navParams.get('sauce');
    this.cheese = navParams.get('cheese');
    this.topping = navParams.get('topping');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderModal');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
