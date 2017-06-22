import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage implements OnInit {

  public items: any;
  public itemsHasData: boolean = false;

  constructor(
    private storage: Storage
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  ngOnInit() {
   this.storage.get('cart').then(
     (result) => {
       this.items = JSON.parse(result);
       this.itemsHasData = true;
    }
   );
  }

}
