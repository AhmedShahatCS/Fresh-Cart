import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { BlankdataService } from 'src/app/services/blankdata.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  searchterm:string=""
  products:Product[]=[]
  pageSize:number=0; //limit
  currentPage:number=1;
  total:number=0;// total num of product
  whishListData:string[]=[]
  constructor(private _BlankdataService:BlankdataService,private _WishlistService:WishlistService,
    private _CartService:CartService,private _ToastrService:ToastrService
    ){}
  ngOnInit(): void {

    this._BlankdataService.getallproduct().subscribe({
      next:(response)=>{
        console.log(response);
        this.products=response.data;
        this.pageSize=response.metadata.limit;
        this.currentPage=response.metadata.currentPage;
        this.total=response.results;
        // console.log(this.products);
       
        
        
        
      },
      error:(err)=>{
        console.log(err);
        
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
        // console.log(response);
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

  pageChanged(event:any):void{
    this._BlankdataService.getallproduct(event).subscribe({
      next:(response)=>{
        console.log(response);
        this.products=response.data;
        this.pageSize=response.metadata.limit;
        this.currentPage=response.metadata.currentPage;
        this.total=response.results;
        // console.log(this.products);
       
        
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

}
