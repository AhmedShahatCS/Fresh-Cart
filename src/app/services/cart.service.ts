import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartComponent } from '../components/cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // headers:any={
  //   token:localStorage.getItem("etoken")
  // }

  cartnum:BehaviorSubject<number>=new BehaviorSubject(0)

  constructor(private _HttpClient:HttpClient) { }
  
  addToCart(productid:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      "productId":productid 
      
  },)
  // {
  //   headers:this.headers
  // })

  }

  gatUserCart():Observable<any>{
    return this._HttpClient.get( `https://ecommerce.routemisr.com/api/v1/cart`,
    )// {
    //   headers:this.headers
    // })
  }

  removeProductFromCart(productid:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`)


  }

  
  updataCart(id:string,count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      "count": count
  })
  // {headers:this.headers})
  }


  clearAllCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)


  }

  checkout(id:string,userdetails:object):Observable<any>{
 return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://ahmedshahatcs.github.io/Fresh-Cart/`,
 {
   shippingAddress:userdetails
 
})
  }

  cachCheckout(id:string,userdetails:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,
    {
      shippingAddress:userdetails
    
   })
  }
}
