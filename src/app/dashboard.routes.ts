import { Routes } from '@angular/router';
import { CandlesComponent } from './features/dashboard/candles/candles.component';
import { ContentComponent } from './features/dashboard/content/content.component';

export const dashboardRoutes: Routes = [

    {path:'candles',component:CandlesComponent},
    {path:'',component:ContentComponent},
];
