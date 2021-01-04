import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
export class Product {
  _id : String ;
  name: String ; 
  price:String;
  image:String;
  categoryId:String;
  quantity:String;
  des: String;
}

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  products: Product[];
  formProduct!:FormGroup;
  constructor( 
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
    
) { }

ngOnInit(): void {
  this.getAllProduct();
  this.formProduct = this.formBuilder.group({
  name: '' ,
  price:'',
  quantity:'',
  des: ''
  })
}
  getAllProduct(){
    this.httpClient.get<any>('http://localhost:2000/products')
    .subscribe(response => {
      this.products = response.products;
      console.log(response)
    })
  }
  onSubmit() {
    console.log(this.formProduct.value)
    const url ='http://localhost:2000/products'
    this.httpClient.post(url,this.formProduct.value).subscribe(
      (result) => {
        console.log(result)
        this.ngOnInit()
        alert("successful");
      }
    );
  }
  onEdit(){
      const url = 'http://localhost:2000/products/5fe488207f0b3b0d0c300ec6';
      this.httpClient.put(url,this.formProduct.value).subscribe(
       (result) => {
         this.ngOnInit()
         alert("successful");
       }
     ); 
    }

    onDelete()
    {
      const url ='http://localhost:2000/products/5ff184f4003d7e136c6e7062';
      this.httpClient.delete(url).subscribe((results) => {
        this.ngOnInit();
        alert("successful");
      })
    }
}
