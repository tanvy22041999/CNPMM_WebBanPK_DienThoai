import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
export class Product {
  _id:String;
  name: String ; 
  image:String;
  quantity:String;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[];
 // formProduct!: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }
  ngOnInit(): void {
   this.getAllProduct()
  }
  getAllProduct(){
    this.httpClient.get<any>('http://localhost:2000/products')
    .subscribe(response => {
      this.products = response.products;
      this.products.forEach(element => {
        let reStr = element.image.substr(0,7);
        element.image = element.image.replace(reStr,"")
        element.image = "http://localhost:2000/upload/"+element.image;
      });
    })
  }
  gotoDetail(product){
    console.log(product)
  }
}
