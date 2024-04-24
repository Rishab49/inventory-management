import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:"details/:type/:id",component:DetailsComponent},
    {path:"",component:HomeComponent}
];
