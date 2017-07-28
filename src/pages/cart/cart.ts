import { Component, OnInit } from '@angular/core';
import { IonicPage, AlertController, NavParams, ModalController } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
export class CartPage implements OnInit {

	public items: any[];
	public itemsHasData: boolean = false;

	public pageTitle: string = "Cart";
	public prevPage: string = null;
	public total: number = 0;

	public belowMinimum: boolean = true;

	constructor(
		private storage: Storage,
		private alertCtrl: AlertController,
		private navParams: NavParams,
		private modalCtrl: ModalController
	) {
		this.prevPage = navParams.get('prevPage') || null;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CartPage');
	}

	ngOnInit() {
		this.loadCart();
	}

	loadCart() {
		this.storage.get('cart').then(
			(result) => {
				this.items = JSON.parse(result);
				this.itemsHasData = true;
				for (let index in this.items) {
					this.total += (parseInt(this.items[index].price) * parseInt(this.items[index].quantity));
					if(this.total > 499) {
						this.belowMinimum = false;
					}
				}
			}
		);
	}

	remove(id) {
		let alert = this.alertCtrl.create({
			title: 'Confirm remove',
			message: 'Do you want to remove this item in the cart?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel'
				},
				{
					text: 'Remove',
					handler: () => {
						this.items = this.items.filter(item => item.id !== id);
						this.total = 0;
						for (let index in this.items) {
							this.total += (parseInt(this.items[index].price) * parseInt(this.items[index].quantity));
						}
						if(this.items.length > 0) {
							this.storage.set('cart', JSON.stringify(this.items));
						} else {
							this.items = null;
							this.storage.set('cart', null);
						}
					}
				}
			]
		});
		alert.present();
	}

	checkout() {
		let checkOutModal = this.modalCtrl.create('CheckoutModal');
		checkOutModal.present();
		checkOutModal.onDidDismiss(data => {
			if(data && typeof data === 'object' && 'emptyCart' in data && data.emptyCart) {
				this.loadCart();
				this.total = 0;
			}
		});
	}

}
