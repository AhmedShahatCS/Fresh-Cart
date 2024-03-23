import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-restpassword',
  templateUrl: './restpassword.component.html',
  styleUrls: ['./restpassword.component.css']
})
export class RestpasswordComponent {
  
  restmessageerror: string = ""
 
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  resetpasswordForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    newPassword: new FormControl("", [Validators.required, Validators.pattern(/^\w{6,}$/)]),

  })
  handelresetpasswordForm(): void {
    this._AuthService.restpassword(this.resetpasswordForm.value).subscribe({
      next:(response) => {
        
        
        // console.log(response);

        localStorage.setItem("etoken", response.token)

        this._Router.navigate(["/login"])


      },
      error: (err) => {
        console.log((err));
        this.restmessageerror = err.error.message

      }
    })

  }

}
