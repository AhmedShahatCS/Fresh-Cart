import { Component, OnInit } from '@angular/core';
import { BlankdataService } from 'src/app/services/blankdata.service';

@Component({
  selector: 'app-categries',
  templateUrl: './categries.component.html',
  styleUrls: ['./categries.component.css']
})
export class CategriesComponent  implements OnInit{
  categries:any[]=[]
  constructor(private _BlankdataService:BlankdataService){}
  ngOnInit(): void {
    this._BlankdataService.getsliderCategry().subscribe({
      next:(response)=>{
        console.log(response.data);
        this.categries=response.data
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
