import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderModalComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'order-modal',
  templateUrl: 'order-modal.html'
})
export class OrderModalComponent implements OnInit {

  public size: any[] = [];
  public sauce: any[] = [];
  public cheese: any[] = [];
  public topping: any[] = [];

  constructor(private viewCtrl: ViewController, private navParams: NavParams) {
    this.size = navParams.get('size');
    this.sauce = navParams.get('sauce');
    this.cheese = navParams.get('cheese');
    this.topping = navParams.get('topping');
  }

  ngOnInit() {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
    // let
  }

}
