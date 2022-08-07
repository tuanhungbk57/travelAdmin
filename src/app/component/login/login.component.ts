import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }
  username: string = "";
  password: string = "";
  login(){
    let body ={username: this.username, password:this.password};
    this.authService.login(body).subscribe((data: any)=>{
      localStorage.setItem("token", data.token);
      this.router.navigate(['/customer/lead'])
    })
  }

}
