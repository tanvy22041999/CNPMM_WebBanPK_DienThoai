import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';

import { DashboardComponent } from './FormAdmin/dashboard/dashboard.component';
import { UserProfileComponent } from './FormAdmin/user-profile/user-profile.component';
import { TableListComponent } from './FormAdmin/table-list/table-list.component';
import { TypographyComponent } from './FormAdmin/typography/typography.component';
import { IconsComponent } from './FormAdmin/icons/icons.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
//home
import {LoginComponent} from './Account/login/login.component';
import {RegisterComponent} from './Account/register/register.component';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { ProductComponent } from './product/product.component';
import { ListproductComponent } from './listproduct/listproduct.component';
import { ShopingcarComponent } from './shopingcar/shopingcar.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductComponent,
    ListproductComponent,
    ShopingcarComponent,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
