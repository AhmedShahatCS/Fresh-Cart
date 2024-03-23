import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errmsg: string = ""
  forgetMessagError: string = ""
  verifictionmessage: string = ""
  restmessageerror: string = ""
  showforgetform: boolean = true
  showverificationform: boolean = false
  showrestform: boolean = false
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  loginform: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  })
  handlelogin(): void {

    if (this.loginform.valid == true) {
      // console.log(this.loginform)
      this._AuthService.loginApi(this.loginform.value).subscribe({
        next: (response) => {
          // console.log(response);
          if (response.message == "success") {
            // console.log(response);


            localStorage.setItem('etoken', response.token)
            // this._AuthService.savuserdatafromtoken()
            this._Router.navigate(['/home'])

          }
          else {
            this._Router.navigate(['/login'])
          }

        },
        error: (err) => {
          this.errmsg = err.error.message


        }
      })


    }
    else {
      this.loginform.markAllAsTouched()
    }

  }


  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email])

  })
  handelforgetpassword(): void {
    if (this.forgetPasswordForm.valid) {
      this._AuthService.forgetpassword(this.forgetPasswordForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.showforgetform = false
          this.showverificationform = true

        },
        error: (err) => {
          console.log(err);
          this.forgetMessagError = err.error.message

        }
      })
    }

  }


  vericationForm: FormGroup = new FormGroup({
    resetCode: new FormControl("", [Validators.required])
  })
  handelverivecationPassword(): void {
    if (this.vericationForm.valid) {
      this._AuthService.vericationFormapi(this.vericationForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.showverificationform = false
          this.showrestform = true

        },
        error: (err) => {
          console.log(err);
          this.verifictionmessage = err.error.message


        }
      })

    }

  }




  resetpasswordForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    newPassword: new FormControl("", [Validators.required, Validators.pattern(/^\w{6,}$/)]),

  })
  handelresetpasswordForm(): void {
    this._AuthService.restpassword(this.resetpasswordForm.value).subscribe({
      next: (response) => {
        console.log(response);

        localStorage.setItem("etoken", response.token)

        this._Router.navigate(["/home"])


      },
      error: (err) => {
        console.log((err));
        this.restmessageerror = err.error.message

      }
    })

  }

}
