import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {CommonService} from '../services/common.service';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
 
@Input("allProductList") allprdts: any;
@Input("searchedText") searchedProduct: string='';
@Input("sortingBy") sortByOption: string='';  
@Output() refresh:EventEmitter<boolean> = new EventEmitter(); 

constructor(public commonService: CommonService, public cart: CartService) {}
    
ngOnInit(){
      console.log(this.allprdts)
      this.sortByOption = 'product_name';
    }
    addToCart(productId,productQty){    
      this.cart.allItems = this.allprdts;
      this.cart.addToCart(productId,productQty,'');
      this.refresh.emit(true);
    }

}
