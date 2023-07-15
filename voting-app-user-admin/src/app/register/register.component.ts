import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AllService } from '../shared/all.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _service: AllService, private router: Router) { }

  ngOnInit(): void {
  }

  profileForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
  });

  onSubmit() {
    this._service.createuser(this.profileForm.value).subscribe(el => {
      console.log(el)
      this.router.navigate(["/login"])
      this.profileForm.reset()
    })
    console.warn(this.profileForm.value);
  }

}
