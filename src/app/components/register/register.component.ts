import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errmsg:string=""
  isloading:boolean=false
  constructor(private _AuthService:AuthService,private _Router:Router){}
  regisrterform: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(""),
    phone: new FormControl("", [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{validators:[this.configPassword]} as FormControlOptions)


  configPassword(group:FormGroup):void{
    let password=group.get("password")
    let rePassword=group.get("rePassword")

    if(rePassword?.value==""){
      rePassword?.setErrors({required:true})
    }
    else if(password?.value != rePassword?.value){
      rePassword?.setErrors({misMatch:true})

    }

  }
  handleform(): void {
   
if (this.regisrterform.valid==true) {
      this.isloading=true
      // console.log(this.regisrterform)
        
  this._AuthService.registerApi(this.regisrterform.value).subscribe({
  next:(response)=>{
    // console.log(response);
   if(response.message=="success"){
    this.isloading=false
    this._Router.navigate(["/login"])
   
   }
    
  },
  error:(err)=>{
    // console.log(err);
   this.errmsg=err.error.message
   this.isloading=false
    
  }
})
    }
  else{
    this.regisrterform.markAllAsTouched()
  }
  }

}
