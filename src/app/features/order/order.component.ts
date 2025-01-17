import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ViewCartResponse } from '../../models/viewCartResponse';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { ShippingDetails } from '../../models/shippingDetails';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

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
  isEmailVerified = false;
  emailForm: FormGroup;

  verifiedEmail: string = ''; // Store verified email


  constructor(private fb: FormBuilder,
    private cartService:CartService,
    private cookieService:CookieService,
    private orderService:OrderService,
    private toastr:ToastrService,
    private route:ActivatedRoute) 
  {
     // Add emailForm initialization here
     this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.shippingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      address: ['', Validators.required],
      email: [{value: '', disabled: true},[Validators.required, Validators.email]], 
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-]+$/)]],
      state: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-]+$/)]],
      postalCode: ['', [Validators.pattern(/^[0-9]{5}$/)]],
      country: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]],
    });
  
   
    
  }

  token=''

  ngOnInit(): void {
    // Extract token from URL query parameters
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.verifyEmail(this.token);
      }
    });
    this.sessionId =  this.getSessionId()
    console.log('Session ID:', this.sessionId); // Debug log
    this.loadOrderSummary();

    const storedEmail = localStorage.getItem('verifiedEmail');
    if (storedEmail) {
      this.verifiedEmail = storedEmail;
      // Populate the form with the verified email and disable it
      this.shippingForm.get('email')?.setValue(this.verifiedEmail);
      this.shippingForm.get('email')?.disable();
  }
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

  calculateTotal(): void {
    this.totalAmount = this.orderSummar.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
  
  onSubmit(): void {
    if (this.shippingForm.valid) {
      const shippingDetails = this.shippingForm.getRawValue();
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

  onSubmitEmail(): void {
    if (this.emailForm.valid) {
      const email = this.emailForm.get('email')?.value;
      console.log('Email:', email);
      this.orderService.sendVerificationEmail(email).subscribe({
        next: () => {
          this.verifiedEmail = email;
          localStorage.setItem('verifiedEmail', this.verifiedEmail);
          this.toastr.success('Verification email sent! Please check your inbox.');
        },
        error: () => {
          this.toastr.error('Error sending verification email.');
        }
      });
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

  verifyEmail(token: string): void {
    console.log("token",token);
    this.orderService.verifyEmail(token).subscribe({
      next: () => {

        this.isEmailVerified = true;
        this.toastr.success('Email verified successfully!');
      },
      error: () => {
        this.toastr.error('Invalid or expired token.');
      }
    });
  }
 

}
