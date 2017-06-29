import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Platform, ViewController, PopoverController, NavController } from 'ionic-angular';
import { Filter } from './../../models/filter.interface';
import { ProductServiceProvider } from './../../providers/product-service/product-service';
import { Observable } from 'rxjs';
import { FilterPopOverComponent } from './../filter-pop-over/filter-pop-over';

/**
 * Generated class for the PizcruHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'pizcru-header',
  templateUrl: 'pizcru-header.html'
})
export class PizcruHeaderComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() prevPageTitle?: string = null;
  @Input() filter?: boolean = false;
  @Input() filterId?: number | string;
  @Input() selectedFilterId?: number | string;
  @Input() productType?: string = null;

  @Output() notifyFilter: EventEmitter<number> = new EventEmitter<number>();

  private productFilter: Observable<Filter[]>;
  public dataLength: number = 0;

  constructor(
    private plt: Platform,
    private viewCtrl: ViewController,
    private productService: ProductServiceProvider,
    private popoverCtrl: PopoverController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    if (this.plt.is('ios')) {
      this.viewCtrl.setBackButtonText(this.prevPageTitle);
    }

    if (this.filter) {
      this.productService.loadFilter(this.filterId);
      this.productService.filter.subscribe(
        (data) => {
          this.dataLength = data.length;
        }
      );

      this.productFilter = this.productService.filter;
    }
  }

  openFilter() {
    let popover = this.popoverCtrl.create(FilterPopOverComponent, { prodCatID: this.filterId, selectedValue: this.selectedFilterId });
    popover.present({ ev: event });

    popover.onDidDismiss(
      (data) => this.notifyFilter.emit(data)
    );
  }

  openCart() {
    this.navCtrl.push('CartPage', { prevPage: this.pageTitle });
		this.navCtrl.canGoBack();
		this.navCtrl.canSwipeBack();
  }

}
