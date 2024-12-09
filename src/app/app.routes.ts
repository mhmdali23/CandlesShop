import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [

    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'dashboard',component:DashboardComponent,loadChildren:()=>import("./dashboard.routes").then(r=>r.dashboardRoutes)},
    { path: '', redirectTo: 'home', pathMatch: 'full' },

];
