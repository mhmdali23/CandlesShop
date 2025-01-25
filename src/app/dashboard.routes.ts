import { Routes } from '@angular/router';
import { CandlesComponent } from './features/dashboard/candles/candles.component';
import { ContentComponent } from './features/dashboard/content/content.component';
import { MessageComponent } from './features/dashboard/message/message.component';
import { CategoriesComponent } from './features/dashboard/categories/categories.component';
import { ScentsComponent } from './features/dashboard/scents/scents.component';
import { StoresComponent } from './features/dashboard/stores/stores.component';

export const dashboardRoutes: Routes = [

    {path:'candles',component:CandlesComponent},
    {path:'message',component:MessageComponent},
    {path:'categories',component:CategoriesComponent},
    { path: 'scents', component: ScentsComponent },
    { path: 'stores', component: StoresComponent },
    {path:'',component:ContentComponent},
];
