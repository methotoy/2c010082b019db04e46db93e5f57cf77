import { Component, ViewChild } from '@angular/core';
import { IonicPage, AlertController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Storage } from '@ionic/storage';
import { PizcruHeaderComponent } from './../../components/pizcru-header/pizcru-header';

/**
 * Generated class for the FavoritesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
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
export class FavoritesPage {

  public items: any[];
  public itemsHasData: boolean = false;

  public pageTitle: string = "Favorites";
  public prevPage: string = null;
  public total: number = 0;

  @ViewChild(PizcruHeaderComponent)
  private pizcruHeaderComponent: PizcruHeaderComponent

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {
    this.prevPage = navParams.get('prevPage') || null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.storage.get('favorites').then(
      (result) => {
        this.items = JSON.parse(result);
        this.itemsHasData = true;
      }
    );
  }

  remove(id) {
    let alert = this.alertCtrl.create({
      title: 'Confirm remove',
      message: 'Do you want to remove this item in your favorites?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Remove',
          handler: () => {
            this.items = this.items.filter(item => item.id !== id);
            if (this.items.length > 0) {
              this.storage.set('favorites', JSON.stringify(this.items));
            } else {
              this.items = null;
              this.storage.set('favorites', null);
            }
          }
        }
      ]
    });
    alert.present();
  }

  order() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })

    loading.present();

    let storageData = [];

    this.storage.get('cart').then((result) => {
      if (result) {
        storageData = JSON.parse(result);

        for (let index in this.items) {
          let existProd = storageData.findIndex(item => item.id === this.items[index].id);

          if (existProd > -1) {
            storageData[existProd].quantity += this.items[index].quantity
          } else {
            storageData.push(this.items[index]);
          }
        }
        this.storage.set('cart', JSON.stringify(storageData));
      } else {
        this.storage.set('cart', JSON.stringify(this.items));
      }

      setTimeout(() => {
        this.pizcruHeaderComponent.openCart();
      }, 1500);

      setTimeout(() => {
        loading.dismiss();
      }, 2000);
    });
  }

}
