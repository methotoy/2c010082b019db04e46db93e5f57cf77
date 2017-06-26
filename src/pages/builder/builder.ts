import { OrderModalComponent } from './../../components/order-modal/order-modal';
import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

import { BuilderServiceProvider } from './../../providers/builder-service/builder-service';

/**
 * Generated class for the BuilderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-builder',
	templateUrl: 'builder.html',
})
export class BuilderPage implements OnInit {

	public builderData: any[] = [];
	public builderHasData: boolean = false;

	public selectedSize: any[] = [];
	private selectedSauce: any[] = [];
	private selectedCheese: any[] = [];
	private selectedTopping: any[] = [];

	constructor(
		private builderService: BuilderServiceProvider,
		private modalCtrl: ModalController
	) {
	}

	ngOnInit() {
		this.getBuilderData();
	}

	getBuilderData() {
		this.builderService.getBuilder()
			.subscribe(
			(response) => this.builderData = response,
			(error) => console.error(error),
			() => {
				for (let index in this.builderData) {
					if (this.builderData[index]['pizza-size']) {
						this.selectedSize.push(this.builderData[index]['pizza-size'][0]);
					}
				}
			}
			// () => this.builderHasData = true
			);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BuilderPage');
	}

	crustSize(data) {
		this.selectedSize = [];
		this.selectedSize.push(data);
	}

	crustSauce(data) {
		if (this.selectedSauce.length > 0) {
			for (let index in this.selectedSauce) {
				if (this.selectedSauce[index].bID === data.bID) {
					this.selectedSauce = this.selectedSauce.filter(item => item.bID !== data.bID);
					return;
				}
			}
		}

		this.selectedSauce.push(data);
	}

	crustCheese(data, quantity) {
		if (this.selectedCheese.length > 0) {
			for (let index in this.selectedCheese) {
				if (this.selectedCheese[index].bID === data.bID) {
					this.selectedCheese[index].quantity = parseInt(this.selectedCheese[index].quantity) + parseInt(quantity);
					console.log(this.selectedCheese);
					return;
				}
			}
		}
		data['quantity'] = quantity;
		this.selectedCheese.push(data);
	}

	crustTopping(data, quantity) {
		if (this.selectedTopping.length > 0) {
			for (let index in this.selectedTopping) {
				if (this.selectedTopping[index].bID === data.bID) {
					this.selectedTopping[index].quantity = parseInt(this.selectedTopping[index].quantity) + parseInt(quantity);
					console.log(this.selectedTopping);
					return;
				}
			}
		}
		data['quantity'] = quantity;
		this.selectedTopping.push(data);
	}

	checkSizeSelected(data) {
		return this.selectedSize.findIndex(item => item.bName == data.bName) > -1 ? true : false;
	}

	checkSauceSelected(data) {
		return this.selectedSauce.findIndex(item => item.bName == data.bName) > -1 ? true : false;
	}

	checkCheeseSelected(data) {
		return this.selectedCheese.findIndex(item => item.bName == data.bName) > -1 ? true : false;
	}

	checkToppingSelected(data) {
		return this.selectedTopping.findIndex(item => item.bName == data.bName) > -1 ? true : false;
	}

	showOrder() {
		let orderModal = this.modalCtrl.create(OrderModalComponent, { 
			size: this.selectedSize,
			sauce: this.selectedSauce,
			cheese: this.selectedCheese,
			topping: this.selectedTopping
		});
		orderModal.onDidDismiss(data => {
			console.log(data);
		});
		orderModal.present();
	}

}
