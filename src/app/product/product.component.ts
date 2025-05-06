import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../core/Model/object-model';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  all_product_data: any;
  addEditProductForm!: FormGroup;
  addEditProduct: boolean = false;
  popup_header!: string;
  add_product!: boolean;
  edit_product!: boolean;
  product_data: any;
  single_product_data: any;
  product_dto!: Product;
  edit_product_id: any;
  

  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService){}

  ngOnInit(): void {
    this.addEditProductForm = this.fb.group(
      {
        name:['',Validators.required],
        uploadPhoto:['',Validators.required],
        productDesc:['',Validators.required],
        mrp:['',Validators.required],
        discoutPrice:['',Validators.required],
        status:['',Validators.required],

      }
    )

    this.getAllProduct();
  }

  get rf(){
    return this.addEditProductForm.controls;
  }

  getAllProduct(){
    this.productService.allProduct().subscribe(data =>{
      this.all_product_data = data;
      console.log("Products 1", this.all_product_data);
    }, error =>{
      console.log("Error", error);
    })
  }

  addProductPopUp(){
    this.add_product = true;
    this.edit_product = false;
    this.popup_header = "Add new Product";
    this.addEditProductForm.reset();
  }

  addNewProduct(){
    this.addEditProduct = true;
    if(this.addEditProductForm.invalid) {
      return;
    }

    this.product_data = this.addEditProductForm.value;

    this.product_dto = {
      id:0,
      name:this.product_data.name,
      uploadPhoto:this.product_data.uploadPhoto,
      productDesc:this.product_data.productDesc,
      mrp:this.product_data.mrp,
      discoutPrice:this.product_data.discoutPrice,
      status:this.product_data.nastmse,
    }

    this.productService.addNewProduct(this.product_dto).subscribe(data =>
     {
console.log(data);
this.getAllProduct();
     }, error => {
      console.log("Error",error);
     });
  }

  editProductPopUp(id: any){
    this.add_product = false;
    this.edit_product = true;
    this.popup_header = "Edit Product";
    this.addEditProductForm.reset();
    this.productService.singleProdut(id).subscribe(data => {
      this.single_product_data = data;
      console.log("Single Data", this.single_product_data);
      this.edit_product_id = data.id;
      this.addEditProductForm.setValue({
        name:this.single_product_data.name,
        uploadPhoto: this.single_product_data.uploadPhoto,
        productDesc: this.single_product_data.productDesc,
        mrp: this.single_product_data.mrp,
        discoutPrice: this.single_product_data.dp,
        status: this.single_product_data.status
      });
    })
  }

  updateProduct(){
    this.addEditProduct = true;
    if(this.addEditProductForm.invalid){
      return;
    }
    this.product_data = this.addEditProductForm.value;

    this.product_dto = {
      id:0,
      name:this.product_data.name,
      uploadPhoto:this.product_data.uploadPhoto,
      productDesc:this.product_data.productDesc,
      mrp:this.product_data.mrp,
      discoutPrice:this.product_data.discoutPrice,
      status:this.product_data.nastmse,
    }
    this.productService.updateProduct(this.edit_product_id, this.product_dto)
    .subscribe(data => {
      this.getAllProduct();
    }, error => {
      console.log("Error", error);
    })
  }

  deleteProdcut(id: any){
    let conf = confirm("Do you want to delete this product id:" + id);

    if(conf){
      this.productService.deleteProduct(id).subscribe(data => {
        console.log("Delete Successfull", data);
        this.getAllProduct();
      }, error => {
        console.log(error);
      })
    }else {
      alert("You pressed cancel!");
    }
  }

}


