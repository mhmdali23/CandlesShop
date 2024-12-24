import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/login/login.component';
import { ShopComponent } from './features/shop/shop.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { CartComponent } from './features/cart/cart.component';
import { OrderComponent } from './features/order/order.component';

export const routes: Routes = [

    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'dashboard',component:DashboardComponent,loadChildren:()=>import("./dashboard.routes").then(r=>r.dashboardRoutes)},
    {path:"shop",component:ShopComponent},
    {path:'details/:id',component:ProductDetailsComponent},
    {path:'cart',component:CartComponent},
    {path:'order',component:OrderComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },

];
