import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
export class Product {
  public _id : String;
  public name: String;
  public price:0;
  public images:String;
  public categoryId: String;
  public quantity:String;
  public des: String;
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  product: Product;
  formProduct!:FormGroup;
  constructor( 
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cookieService: CookieService
) { }
  getProduct = async(id) =>{
  this.httpClient.get<any>('http://localhost:2000/products/'+id)
  .subscribe(async(response) => {
    this.product = await response.product;
    console.log(this.product)
    let reStr = this.product.images.substr(0,7);
    this.product.images = this.product.images.replace(reStr,"")
    this.product.images = "http://localhost:2000/upload/"+this.product.images;
  })
}
  ngOnInit(): void {
    this.route.params.subscribe( async(params) => {
     await this.getProduct(params.id)
    });
  }
  addCart(){
    let productCookie = {
      _id: this.product._id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.images,
      quantity: this.product.quantity
    }
    let products;
    products = this.cookieService.get('product');
    if(!products)
    {
      products='';
    }
    products = products +this.product._id+' ';

    this.cookieService.set('product',products);
  }
}
