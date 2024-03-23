import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarBlankComponent } from './components/navbar-blank/navbar-blank.component';
import { NavbarAuthComponent } from './components/navbar-auth/navbar-auth.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategriesComponent } from './components/categries/categries.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { DetailsComponent } from './components/details/details.component';
import {BrowserAnimationsModule}from "@angular/platform-browser/animations"
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TermTextPipe } from './term-text.pipe';
import { SearchPipe } from './search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { MyhttpInterceptor } from './myhttp.interceptor';
import { BrandetailsComponent } from './brandetails/brandetails.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingscreanInterceptor } from './loadingscrean.interceptor';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { VerficationcodeComponent } from './components/verficationcode/verficationcode.component';
import { RestpasswordComponent } from './components/restpassword/restpassword.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavbarBlankComponent,
    NavbarAuthComponent,
    HomeComponent,
    CartComponent,
    BrandsComponent,
    CategriesComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    NotFoundComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    DetailsComponent,
    TermTextPipe,
    SearchPipe,
    BrandetailsComponent,
    CheckoutComponent,
    AllordersComponent,
    WhishlistComponent,
    ForgetpasswordComponent,
    VerficationcodeComponent,
    RestpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgxSpinnerModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:MyhttpInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingscreanInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
