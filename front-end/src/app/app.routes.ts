import { Routes } from '@angular/router';
import { SignInComponent } from './features/auth/signin/sign-in.component';
import { SignUpComponent } from './features/auth/signup/sign-up.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:"app-sign-in",
        pathMatch:'full'
    },
    {
        path:"app-sign-in",
        component:SignInComponent,
    },
    {
        path:'app-sign-up',
        component:SignUpComponent,
    },
    {
        path:'dashboard',
        component:DashboardComponent
    }
 ];
