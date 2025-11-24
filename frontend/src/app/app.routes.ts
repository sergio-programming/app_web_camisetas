import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login-component/login-component';
import { HomeComponent } from './pages/home-component/home-component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' },
    { path: 'home', component: HomeComponent }
];
