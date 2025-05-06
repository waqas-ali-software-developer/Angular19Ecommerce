import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order, Product, User } from '../../../core/Model/object-model';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  single_product_id: any;
  user_id: any;
  individual_product!: Product;
  user_details!: User;
  user_address!: any;
  user_contact_num: any;
  user_detail: any;
  order_dto!: Order;




  constructor(private customerService: CustomerService, private router: Router){}


  ngOnInit(): void {
    this.customerService.currentProduct.subscribe(product => this.single_product_id = product);
    this.user_id = Number(sessionStorage.getItem("user_session_id"));
    this.productDetail(this.single_product_id);
    this.userAddress(this.user_id);
  }
 
  productDetail(single_product_id: any) {
    this.customerService.individualProduct(single_product_id).subscribe(data => {
      this.individual_product = data[0];
      console.log(this.individual_product);
      console.log(this.individual_product.name);
    }, error => {
      console.log("Error", error);
    })

  }

  userAddress(user_id :any){
    
    this.customerService.userDetail(user_id).subscribe(data => {
      this.user_address = data[0].address;
      this.user_contact_num = data.mobNumber;

    }, error =>{
      console.log("Error",error);
    })
  }


  placeOrder(){
    this.order_dto = {
      id:0,
      userId:this.user_id,
      sellerId: 2,
      product: {
        id: this.individual_product.id,
        name: this.individual_product.name,
        uploadPhoto: this.individual_product.uploadPhoto,
        productDesc: this.individual_product.productDesc,
        mrp: this.individual_product.mrp,
        discoutPrice : this.individual_product.discoutPrice,
        status: this.individual_product.status,
      },deliveryAddres: {
        id: 0,
        addLine1: this.user_address.addLine1,
        addLine2: this.user_address.addLine2,
        city: this.user_address.city,
        state: this.user_address.state,
        zipCode: this.user_address.zipCode,

      },
      contactNum: this.user_contact_num,
      dateTime: new Date().toLocaleDateString()
    }
    console.log("order do",this.order_dto);
this.customerService.insertNewOrder(this.order_dto).subscribe(data =>{
  alert("Your order placed successfully!");
  this.router.navigateByUrl('/buyer-dashboard');  
}, error => {
  console.log("order error", error);
});
  }




}
