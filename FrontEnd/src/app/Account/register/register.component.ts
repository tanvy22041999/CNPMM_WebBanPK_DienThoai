import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      fName:'',
      lName:'',
      email:'',
      password:'',
      gender:'',
      birthday:'',
      phone:'',
      isAdmin:false,
      isConfirm:false,
      isLock:false,
    })
  }
  onSubmit() {
    console.log(this.formRegister.value)
    const url ='http://localhost:2000/users'
    this.httpClient.post(url,this.formRegister.value).subscribe(
      (result) => {
        this.ngOnInit()
        alert("successful");
      }
    );
  }
}
