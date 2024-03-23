import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartid:string=""
  cartdatails:any={}
constructor(private _CartService:CartService,private _ToastrService:ToastrService
  ){}
ngOnInit(): void {
  this._CartService.gatUserCart().subscribe({
    next:(response)=>{
      console.log(response.data);
      this.cartdatails=response.data
      this.cartid=response.data._id
      console.log(this.cartid);
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
   
  
}


removeItem(id:string):void{
  this._CartService.removeProductFromCart(id).subscribe({
    next:(response)=>{
      // console.log(response);
      this.cartdatails=response.data
      this._CartService.cartnum.next(response.numOfCartItems)
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

changesCount(id:string,count:number):void{
 if(count>0){
  this._CartService.updataCart(id,count).subscribe({
    next:(response)=>{
      // console.log(response);
      
      this.cartdatails=response.data

      
    },
    error:(err)=>{
      console.log(err)
    }
    })
 }
  }

clearAll():void{
  this._CartService.clearAllCart().subscribe({
    next:(response)=>{
      console.log(response);
      this.cartdatails=response
      this._ToastrService.success("Your Cart is Cleard")
      this._CartService.cartnum.next(0)
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
}