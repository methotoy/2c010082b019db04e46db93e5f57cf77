import { Component, OnInit } from '@angular/core';
import { IonicPage, AlertController, NavParams, ModalController } from 'ionic-angular';
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

	public items: any[];
	public itemsHasData: boolean = false;

	public pageTitle: string = "Cart";
	public prevPage: string = null;
	public total: number = 0;

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
		this.storage.get('cart').then(
			(result) => {
				this.items = JSON.parse(result);
				this.itemsHasData = true;
				for (let index in this.items) {
					this.total += (parseInt(this.items[index].price) * parseInt(this.items[index].quantity));
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
						this.storage.set('cart', JSON.stringify(this.items));
					}
				}
			]
		});
		alert.present();
	}

	checkout() {
		let checkOutModal = this.modalCtrl.create('CheckoutModal');
		checkOutModal.present();
	}

}
