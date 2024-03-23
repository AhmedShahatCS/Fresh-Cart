import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }
  registerApi(data:object):Observable<any>{

    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,data)

  }

  loginApi(data:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,data)
  }

  forgetpassword(email:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
    email)
  }

  vericationFormapi(resetCode:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
    resetCode)
  }

  restpassword(userdata:object):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
    userdata)
  }


  userDataFromtoken:any
  userId:string=''
  savuserdatafromtoken(){
    if(localStorage.getItem('etoken')!=null){
      let encodetoken:any=localStorage.getItem('etoken')
      let decodetoken=jwtDecode(encodetoken)
      this.userDataFromtoken=decodetoken
      this.userId=this.userDataFromtoken.id
      // console.log(this.userDataFromtoken);
      // console.log(this.userId);
    
      
     
      

    }
  }
  
  
}
