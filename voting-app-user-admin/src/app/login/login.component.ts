import { Component, OnInit } from '@angular/core';
import { AllService } from '../shared/all.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  adminvalue: any;
  users: any = [];

  constructor(private _service: AllService, private router: Router) { }
  ngOnInit(): void {
    this._service.getadmin().subscribe(event => {
      this.adminvalue = event
      console.log(this.adminvalue);
    });
  }
  checkuseroradmin(logininfo: any): void {
    // console.log(logininfo);
    let value = logininfo
    if (value.username !== "" && value.password !== "") {
      this._service.getuser(value.username, value.password).subscribe(element => {
        console.log(element)
        if (element.length > 0) {
          sessionStorage.setItem('token', element[0].username);
          sessionStorage.setItem('role', element[0].role);
          if (element[0].role == 'admin') {
            this.router.navigate(['/main']);
          }
          else {
            this.router.navigate(['/userpage']);
          }
          console.log("element", element[0])
        }
        else {
          alert("Invalid credentials");
          sessionStorage.clear();
        }
      });
    }
    else {
      alert("Please fill the credentials");
      sessionStorage.clear();
    }
  }
  // variable - default false
  show: boolean = false;
  showpassword() {
    this.show = !this.show;
    // console.log(this.show)
  }
}
