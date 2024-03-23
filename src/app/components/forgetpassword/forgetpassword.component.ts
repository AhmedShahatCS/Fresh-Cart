import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  forgetMessagError: string = ""
  
  constructor(private _AuthService: AuthService, private _Router: Router) { }



  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email])

  })
  handelforgetpassword(): void {
    if (this.forgetPasswordForm.valid) {
      this._AuthService.forgetpassword(this.forgetPasswordForm.value).subscribe({
        next: (response) => {
          console.log(response);
        

        },
        error: (err) => {
          console.log(err);
          this.forgetMessagError = err.error.message

        }
      })
    }

  }
}
