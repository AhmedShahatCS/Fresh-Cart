import { Component, OnInit } from '@angular/core';
import { BlankdataService } from 'src/app/services/blankdata.service';
import { CartComponent } from '../cart/cart.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  // allorders:any[]=[]
  userid:string=""
  allordersofUsers:any[]=[]
  userorders:any={}
  constructor(private _BlankdataService:BlankdataService ,private _AuthService:AuthService){}
  // idcart:any=this._BlankdataService.idcart

  ngOnInit(): void {
    this._AuthService.savuserdatafromtoken()
    this.userid=this._AuthService.userId
    console.log(this.userid);
    
    
    this._BlankdataService.getallorder(this.userid).subscribe({
      next:(response)=>{
        // console.log(response);
        this.allordersofUsers=response
        console.log(this.allordersofUsers);
        
        // console.log(this.allordersofUsers[this.allordersofUsers.length-1]);
        this.userorders=this.allordersofUsers[this.allordersofUsers.length-1]
        console.log(this.userorders.cartItems);
        

        
        // this.allorders=response.data
        // console.log(this.allorders);
        
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
      
    })
  }

}
