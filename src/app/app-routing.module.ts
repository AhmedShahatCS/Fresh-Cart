import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategriesComponent } from './components/categries/categries.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { BrandetailsComponent } from './brandetails/brandetails.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { VerficationcodeComponent } from './components/verficationcode/verficationcode.component';
import { RestpasswordComponent } from './components/restpassword/restpassword.component';

const routes: Routes = [

  {path:"",
  canActivate:[authGuard],
  component:BlankLayoutComponent,children:[
    {path:"" ,redirectTo:"home",pathMatch:"full"},
    {path:"home" ,component:HomeComponent,title:"Home"},
    {path:"brands" ,component:BrandsComponent,title:"Brands"},
    {path:"cart" ,component:CartComponent,title:"Cart"},
    {path:"whishlist" ,component:WhishlistComponent,title:"WhishList"},
    {path:"allorders" ,component:AllordersComponent,title:"AllOrders"},
    {path:"checkout/:id" ,component:CheckoutComponent,title:"checkout"},

    {path:'datails/:id',component:DetailsComponent,title:"Details"},
    {path:"details/:id",component:BrandetailsComponent,title:"BrandDetails"},
    {path:"categries" ,component:CategriesComponent,title:"Categries"},
    {path:"product" ,component:ProductsComponent,title:"Products"},
    
  ]},
  
  {path:"",component:AuthLayoutComponent,children:[
    {path:"login" ,component:LoginComponent,title:"Login"},
    {path:"register" ,component:RegisterComponent,title:"Register"},
    {path:"forgetPassword" ,component:ForgetpasswordComponent,title:"Forget Pawword"},
    {path:"restPassword" ,component:RestpasswordComponent,title:"Rest Pawword"},
    {path:"verificationCode" ,component:VerficationcodeComponent,title:"verification Code"}
  ]},
  
  
  {path:"**" ,component:NotFoundComponent,title:"Not-Found"},

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
