import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './Account//login/login.component';
import {RegisterComponent} from './Account/register/register.component';
import {HomeComponent} from './home/home.component';
import {ProductComponent } from './product/product.component';
import {ListproductComponent} from './listproduct/listproduct.component';
import {ShopingcarComponent} from './shopingcar/shopingcar.component'
const routes: Routes =[
  {
    
    path: 'admin',
    
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'listproduct', component: ListproductComponent},
  {path: 'shopingcar', component: ShopingcarComponent},
   {
    path: '',component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
