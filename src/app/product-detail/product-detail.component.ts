import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {CommonService} from '../services/common.service';
import {Router} from '@angular/router';
import {CartService} from '../services/cart.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
createProductForm: FormGroup;
 isEdit: boolean;
@Input("allProductList") allprdts: any;
@Input("searchedText") searchedProduct: string='';
@Input("sortingBy") sortByOption: string='';  
@Output() refresh:EventEmitter<boolean> = new EventEmitter(); 

constructor(private formBuilder: FormBuilder, public commonService: CommonService, public cart: CartService, private router: Router) {}
showDeleteDialog = false;
selectedIndex: any;
showCreateProduct = false;

ngOnInit(){
      this.sortByOption = 'product_name';

       this.createProductForm = this.formBuilder.group({
      p_id : [''],
      product_name : [null, Validators.required],
      product_weight : [null],
      product_price : [null]
    });

    }

    deleteProdConfirm(i) {      
      this.selectedIndex = i;
      this.showDeleteDialog = true;
    }   

    deleteSelectedRow(){
      this.allprdts.splice(this.selectedIndex, 1);
    }

    navigateToCreate() {
      this.isEdit = false;
      this.showCreateProduct = true;
    }

  createProd() {
    if(this.createProductForm.valid) {
    this.allprdts.unshift(this.createProductForm.value)
    } 
    this.createProductForm.reset();
    this.showCreateProduct = false;

  }

  editProd(prod, index) {
    this.isEdit = true;
    this.showCreateProduct = true;
    this.selectedIndex = index;
    for(let i=0; i < this.allprdts.length;i++) {
      if(this.allprdts[i].p_id == prod.p_id) {
        this.createProductForm.patchValue(prod);
      }
    }
  }

  updateProductDetail(prod) {
    for(let i=0; i < this.allprdts.length;i++) {
      if(i == this.selectedIndex) {
          this.allprdts[i] = prod;
      }
    }
    this.showCreateProduct = false;
    this.createProductForm.reset();
  }
}
