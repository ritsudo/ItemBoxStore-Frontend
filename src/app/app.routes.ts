import { Routes } from '@angular/router';
import { MainPageComponent } from './layout/main-page/main-page.component';
import { RegisterPageComponent } from './layout/register-page/register-page.component';
import { LoginPageComponent } from './layout/login-page/login-page.component';
import { CreatePageComponent } from './layout/create-page/create-page.component';
import { DetailPageComponent } from './layout/detail-page/detail-page.component';

export const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'create', component: CreatePageComponent},
    {path: 'detail-page', component: DetailPageComponent}
];
