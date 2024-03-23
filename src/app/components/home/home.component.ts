import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { BlankdataService } from 'src/app/services/blankdata.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchterm:string="";
  products:Product[]=[];
  categries:any[]=[];
  whishListData:string[]=[];
  constructor(private _BlankdataService:BlankdataService,private _CartService:CartService,private _ToastrService:ToastrService,private _WishlistService:WishlistService
    ){}

  ngOnInit(): void {

    this._BlankdataService.getallproduct().subscribe({
      next:(response)=>{
        // console.log(response);
        this.products=response.data
        // console.log(this.products);
        
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    this._BlankdataService.getsliderCategry().subscribe({
      next:(response)=>{
        // console.log(response);
        this.categries=response.data
        
        
      },
      error:(err)=>
      {console.log(err);
      }
    })
    this._WishlistService.getWhishlist().subscribe({
      next:(response)=>{
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
   

  adFav(id:string|undefined):void{  
    this._WishlistService.addtoWhishlist(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message)
        this.whishListData=response.data
        this._WishlistService.whishlistnum.next(this.whishListData.length)
        
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
        this._WishlistService.whishlistnum.next(this.whishListData.length)
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  customOptionsOfCategry: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  mainslider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    navText: ['', ''],
    items:1,
    nav: false
  }



}
