import { Routes } from '@angular/router';
import { CandlesComponent } from './features/dashboard/candles/candles.component';
import { ContentComponent } from './features/dashboard/content/content.component';
import { MessageComponent } from './features/dashboard/message/message.component';

export const dashboardRoutes: Routes = [

    {path:'candles',component:CandlesComponent},
    {path:'message',component:MessageComponent},
    {path:'',component:ContentComponent},
];
