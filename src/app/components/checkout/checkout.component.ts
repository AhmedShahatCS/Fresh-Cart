import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  idOfCart:any=""
  constructor(private _FormBuilder:FormBuilder,private _ActivatedRoute:ActivatedRoute,private _CartService:CartService,private _ToastrService:ToastrService){}
  checkout:FormGroup=this._FormBuilder.group({
    details:[""],
    phone:[""],
    city:[""]
  })
  ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(parmas)=>{
      // console.log(parmas.get("id"));
      this.idOfCart=parmas.get("id")
      
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
  
}

  hadellformcheckout():void{
    console.log(this.checkout.value);

    this._CartService.checkout(this.idOfCart,this.checkout.value).subscribe({
      next:(response)=>{
        // console.log(response);
        if(response.status=="success"){
          window.open(response.session.url,'_self')

          this._CartService.cartnum.next(0)

        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    

  }
  handelcashcheckout():void{
    this._CartService.cachCheckout(this.idOfCart,this.checkout.value).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.status=="success"){
          this._ToastrService.success("success process")

          this._CartService.cartnum.next(0)
          

        }
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    

  }

  }


