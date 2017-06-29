import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, LoadingController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
		private navParams: NavParams,
		private loadingCtrl: LoadingController,
		private strg: Storage,
		private navCtrl: NavController
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
		this.viewCtrl.dismiss({ sauce: this.sauce, cheese: this.cheese, topping: this.topping });
	}

	addSauceQuantity(id) {
		this.sauce.forEach(item => {
			if (item.bID === id) {
				item.quantity = (item.quantity) ? parseInt(item.quantity) + 1 : 2;
				return;
			}
		});
	}

	deleteSauceQuantity(id) {
		this.sauce.forEach(item => {
			if (item.bID === id) {
				if (item.quantity && parseInt(item.quantity) !== 1) {
					item.quantity = parseInt(item.quantity) - 1;
					return;
				}
				this.sauce = [];
			}
		});
	}

	addCheeseQuantity(id) {
		this.cheese.forEach(item => {
			if (item.bID === id) {
				item.quantity = (item.quantity) ? parseInt(item.quantity) + 1 : 2;
				return;
			}
		});
	}

	deleteCheeseQuantity(id) {
		this.cheese.forEach(item => {
			if (item.bID === id) {
				if (parseInt(item.quantity) !== 1) {
					item.quantity = parseInt(item.quantity) - 1;
					return;
				}
				this.cheese = this.cheese.filter(item2 => item2.bID !== id);
				return;
			}
		});
	}

	addToppingQuantity(id) {
		this.topping.forEach(item => {
			if (item.bID === id) {
				item.quantity = (item.quantity) ? parseInt(item.quantity) + 1 : 2;
				return;
			}
		});
	}

	deleteToppingQuantity(id) {
		this.topping.forEach(item => {
			if (item.bID === id) {
				if (parseInt(item.quantity) !== 1) {
					item.quantity = parseInt(item.quantity) - 1;
					return;
				}
				this.topping = this.topping.filter(item2 => item2.bID !== id);
				return;
			}
		});
	}

	totalPrice() {
		let totalPrice = 0;
		if (this.size) {
			totalPrice = parseInt(this.size[0].bPrice);
		}
		if (this.sauce) {
			for (let index in this.sauce) {
				totalPrice += (parseInt(this.sauce[index].bPrice) * parseInt(this.sauce[index].quantity || 1));
			}
		}
		if (this.cheese) {
			for (let index in this.cheese) {
				totalPrice += (parseInt(this.cheese[index].bPrice) * parseInt(this.cheese[index].quantity));
			}
		}
		if (this.topping) {
			for (let index in this.topping) {
				totalPrice += (parseInt(this.topping[index].bPrice) * parseInt(this.topping[index].quantity));
			}
		}
		return totalPrice;
	}

	addToCart() {
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		})

		loading.present();

		let selectedItems = [];
		if (this.size) {
			selectedItems.push({ productName: `Crust Size: ${this.size[0].bName} ${this.size[0].bDescription}`, });
		}
		if (this.sauce) {
			for (let index in this.sauce) {
				selectedItems.push({ productName: `Sauce: ${this.sauce[index].bName} x ${this.sauce[index].quantity || 1}`, });
			}
		}
		if (this.cheese) {
			for (let index in this.cheese) {
				selectedItems.push({ productName: `Cheese: ${this.cheese[index].bName} x ${this.cheese[index].quantity || 1}`, });
			}
		}
		if (this.topping) {
			for (let index in this.topping) {
				selectedItems.push({ productName: `Topping: ${this.topping[index].bName} x ${this.topping[index].quantity || 1}`, });
			}
		}

		let storageData = [];
		let dealData = {
			id: new Date().getTime() + '-032814',
			product: 'Pizza Builder',
			price: this.totalPrice() || 0,
			image: 'logo',
			itemSelected: selectedItems,
			quantity: 1
		};

		this.strg.get('cart').then((result) => {
			if (result) {
				storageData = JSON.parse(result);
				storageData.push(dealData);
				this.strg.set('cart', JSON.stringify(storageData));
			} else {
				storageData.push(dealData);
				this.strg.set('cart', JSON.stringify(storageData));
			}

			setTimeout(() => {
				this.navCtrl.push('CartPage', { prevPage: 'Order' });
				this.navCtrl.canGoBack();
				this.navCtrl.canSwipeBack();
			}, 1500);

			setTimeout(() => {
				loading.dismiss();
			}, 2000);
		});
	}

}
