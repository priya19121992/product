import { Component, OnInit } from '@angular/core';
import { ProductsModel } from '../model/products.model';
import {CartService} from '../services/cart.service';



@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {
  public cartflag:boolean= false;
  public sortBy: string ='';
  public sortOption: string ='product_name|asc';
constructor (
  public products:ProductsModel, public cart:CartService
  ){
    console.log(this.cart)
}
ngOnInit(){
  this.ref();
}
ref(){
  this.cartflag = false;
  setTimeout( () => {
      this.cartflag = true;
  }, 10 )
}

changeQty(pid,qty,replace){
  if(qty !== ''){
    qty=parseInt(qty) || 1;
    this.cart.addToCart(pid,qty,replace);
  }else{
    this.cart.addToCart(pid,1,replace);
  }
  
}

emptyCart(){
  let cartStatus = confirm("Are you sure you want to clear the cart ?");
  if(cartStatus){
    this.cart.emptyCart();
    document.location.href = '/cartProduct';
  }
}

}
