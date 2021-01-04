import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
formCreateUser!: FormGroup
  constructor(
     private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.formCreateUser= this.formBuilder.group({
      fName:'',
      lName:'',
      email:'',
      password:'',
      gender:'',
      birthday:'',
      phone:'',
      isAdmin:true,
      isConfirm:false,
      isLock:false,
    })
  } 
  onSubmit() {
    console.log(this.formCreateUser.value)
    const url ='http://localhost:2000/users'
    this.httpClient.post(url,this.formCreateUser.value).subscribe(
      (result) => {console.log(result)
        this.ngOnInit()
        console.log("successful"); 
        alert("successful");
      }
    );
  }

}
