import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit 
{
  formLogin!: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router:Router
  ) { }
  //bat du lieu
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email:'',
      password:''
    })
  } 
  onSubmit()
  {
    console.log(this.formLogin.value)
    const url ='http://localhost:2000/users/login'
    this.httpClient.post<any>(url,this.formLogin.value).subscribe(
      response => {
      if(response.code === 200){
        this.cookieService.set('auth',response.token)
        if(response.isAdmin){
          this.router.navigateByUrl('/admin')
        }
        else{
          this.router.navigateByUrl('/shopingcar')
        }
      }else {
        this.cookieService.set('auth','')
      }
      }
    );
}
}
