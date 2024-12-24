import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ViewCartResponse } from '../../models/viewCartResponse';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { ShippingDetails } from '../../models/shippingDetails';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})

export class OrderComponent {

  shippingForm: FormGroup;
  orderSummar:ViewCartResponse[] =[]
  sessionId :string=''
  totalAmount = 0;

  constructor(private fb: FormBuilder,private cartService:CartService
    ,private cookieService:CookieService,private orderService:OrderService,private toastr:ToastrService) 
  {
    this.shippingForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: [''],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.sessionId =  this.getSessionId()
    this.loadOrderSummary();
  }

  getSessionId(){
    return this.cookieService.get("SessionId");
  }

  loadOrderSummary(){
    this.cartService.viewCart(this.sessionId).subscribe({
      next:(response) =>{
        this.orderSummar=response
        console.log(response)
        this.calculateTotal(); // Calculate the total after loading the summary
      }
    })
    
  }

  calcPrice(){

  }
  calculateTotal(): void {
    this.totalAmount = this.orderSummar.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
  
  onSubmit(): void {
    if (this.shippingForm.valid) {
      const shippingDetails:ShippingDetails = this.shippingForm.value
      this.orderService.placeOrder(shippingDetails).subscribe({
        next:()=>{
          this.toastr.success("Order placed succeessfully")
          setTimeout(() => {
            window.location.href = "http://localhost:4200/home";
          }, 2000);
        },
        error: () => {
          this.toastr.error('Error placing order');
        },
      })
    } else {
      console.log('Form is invalid');
    }
  }
  validateField(fieldName: string): void {
    const control = this.shippingForm.get(fieldName);
    if (control) {
      control.markAsTouched(); // Mark the field as touched
      control.updateValueAndValidity(); // Trigger validation
    }
  }
}
