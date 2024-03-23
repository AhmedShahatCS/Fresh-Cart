import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verficationcode',
  templateUrl: './verficationcode.component.html',
  styleUrls: ['./verficationcode.component.css']
})
export class VerficationcodeComponent {
  
  verifictionmessage: string = ""
  
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  vericationForm: FormGroup = new FormGroup({
    resetCode: new FormControl("", [Validators.required])
  })
  handelverivecationPassword(): void {
    if (this.vericationForm.valid) {
      this._AuthService.vericationFormapi(this.vericationForm.value).subscribe({
        next: (response) => {
          console.log(response);
         

        },
        error: (err) => {
          console.log(err);
          this.verifictionmessage = err.error.message


        }
      })

    }

  }

}
