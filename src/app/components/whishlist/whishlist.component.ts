import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit{
  favProduct:Product[]=[]
  whishListData:string[]=[]
  
  constructor(private _WishlistService:WishlistService,private _ToastrService:ToastrService,private _CartService:CartService){}
  ngOnInit(): void {
    this._WishlistService.getWhishlist().subscribe({
      next:(response)=>{
        console.log(response);
        this.favProduct=response.data
        // console.log(this.favProduct);
        // console.log(response.data);
        const newdata=response.data.map((item:any)=>item._id)
        // console.log(newdata);
        
        this.whishListData=newdata
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  adFav(id:string|undefined):void{  
    this._WishlistService.addtoWhishlist(id).subscribe({
      next:(response)=>{
        // console.log(response);
        this._ToastrService.success(response.message)
        this.whishListData=response.data
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  removeFav(id:string|undefined):void{
    this._WishlistService.removfromWhishlist(id).subscribe({
      next:(response)=>{
        // console.log(response);
        this._ToastrService.warning(response.message)
        this.whishListData=response.data

        // طريقه علشان احذف المنتج ع طول اول لما اضغط عليه حذف ف الوشلست بس ده مشكله علشان بعمل ريكوست وخلاص
        /*this._WishlistService.getWhishlist().subscribe({
          next:(response)=>{
            // console.log(response);
            this.favProduct=response.data
            console.log(this.favProduct);
          }})*/
          //طريقه تانيه افضل عن طريق الفلتر
          // console.log("befor",this.favProduct);
          const newfavproduct=this.favProduct.filter((item:any)=>this.whishListData.includes(item._id))
          // console.log("after",newfavproduct);
          this.favProduct=newfavproduct
          this._WishlistService.whishlistnum.next(this.whishListData.length)
          
          

        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  addcart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        // console.log(response);
        this._ToastrService.success(response.message)
        this._CartService.cartnum.next(response.numOfCartItems)
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }



}
