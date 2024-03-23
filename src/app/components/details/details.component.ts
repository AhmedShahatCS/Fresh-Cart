import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Product } from 'src/app/interfaces/product';
import { BlankdataService } from 'src/app/services/blankdata.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  productdetails:Product={} as Product;
  // productImgesForSlider:string[]=[]
  constructor(private _ActivatedRoute:ActivatedRoute,private _BlankdataService:BlankdataService,private _CartService:CartService,private _ToastrService:ToastrService){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let productid:any=params.get('id');
        // console.log(productid);
        // console.log(params);
        this._BlankdataService.getproductdetails(productid).subscribe({
          next:(response)=>{
            // console.log(response);
            console.log(response.data);
            this.productdetails=response.data;
            // this.productImgesForSlider=response.data.images
            // console.log(this.productImgesForSlider);
            
            
          },
          error:(err)=>{
            console.log(err);
          }

        })
        
      }
    })

    
  }
  addCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message)
        this._CartService.cartnum.next(response.numOfCartItems)
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

}
