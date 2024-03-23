import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlankdataService } from '../services/blankdata.service';

@Component({
  selector: 'app-brandetails',
  templateUrl: './brandetails.component.html',
  styleUrls: ['./brandetails.component.css']
})
export class BrandetailsComponent implements OnInit {
  brandDetails:any={}
  constructor(private _ActivatedRoute:ActivatedRoute,private _BlankdataService:BlankdataService){}


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(parm)=>{
        let brandDetails:any=parm.get("id");
        this._BlankdataService.GetBrandsDetails(brandDetails).subscribe({
          next:(response)=>{
            // console.log(response);
            this.brandDetails=response.data
            console.log(this.brandDetails);
            
            
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
      },
      error:(err)=>{console.log(err);
      }
    })
  }
}
