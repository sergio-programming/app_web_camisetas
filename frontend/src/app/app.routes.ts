import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { HomeWelcomeComponent } from './components/home-welcome-component/home-welcome-component';

export const routes: Routes = [
    { path: 'login', component: Login },
    { 
        path: 'home', 
        component: Home,
        children: [
            { path: '', component: HomeWelcomeComponent }
        ]
    },


    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
    
];
