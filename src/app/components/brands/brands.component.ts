import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { BlankdataService } from 'src/app/services/blankdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  allBrands:any[]=[]
  constructor(private _BlankdataService:BlankdataService){}

ngOnInit(): void {
  this._BlankdataService.getAllBrands().subscribe({
    next:(response)=>{
      // console.log(response.data);
      this.allBrands=response.data
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

}
