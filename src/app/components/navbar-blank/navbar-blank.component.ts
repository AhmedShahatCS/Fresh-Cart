import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.css']
})
export class NavbarBlankComponent implements OnInit {
  cartnumber:number=0;
  whishlistnum:number=0;
  constructor(private _Router:Router,private _CartService:CartService,private _WishlistService:WishlistService){}
  ngOnInit(): void {
    this._CartService.cartnum.subscribe({
      next:(data)=>{
      //  console.log("nav",data);
      this.cartnumber=data

      }
    })

    this._CartService.gatUserCart().subscribe({
      next:(response)=>{
        console.log(response);
        this.cartnumber=response.numOfCartItems
        

      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    
    this._WishlistService.whishlistnum.subscribe({
      next:(data)=>{
        console.log("nav",data);
        this.whishlistnum=data
        
      }
    })
    this._WishlistService.getWhishlist().subscribe({
      next:(response)=>{

        this.whishlistnum=response.count
      }
    })
  }


  logout(){
    localStorage.removeItem('etoken')
    this._Router.navigate(['/login'])
  }

}
