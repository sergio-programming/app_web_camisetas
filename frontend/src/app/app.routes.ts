import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { HomeWelcomeComponent } from './components/home-welcome-component/home-welcome-component';
import { UserComponent } from './components/user-component/user-component';
import { ProductComponent } from './components/product-component/product-component';

export const routes: Routes = [
    { path: 'login', component: Login },
    { 
        path: 'home-admin', 
        component: Home,
        children: [
            { path: '', component: HomeWelcomeComponent },
            { path: 'users', component: UserComponent },
            { path: 'products', component: ProductComponent }
        ]
    },


    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
    
];
