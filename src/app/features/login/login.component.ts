import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AuthenticationRequest } from '../../models/authenticationRequest';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authRequest:AuthenticationRequest={Password:'',Username:''}

  loginForm:FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthenticationService,private toastr:ToastrService ,private router:Router){

    this.loginForm= fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.authRequest.Username = this.loginForm.value.username;
      this.authRequest.Password = this.loginForm.value.password;
      this.authService.login(this.authRequest).subscribe({
        next:(response)=>{
          this.authService.storeToken(response);
          this.toastr.success("Login successfully");
          setTimeout(() => {
            window.location.href="http://localhost:4200/home"
          }, 1000);
          // this.router.navigateByUrl('');
        },
        error: (err) => this.toastr.error("Username or Password is incorrect","Login Failed"),
      })
    }
  }

}
