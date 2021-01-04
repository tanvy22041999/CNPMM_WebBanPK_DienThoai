import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-shopingcar',
  templateUrl: './shopingcar.component.html',
  styleUrls: ['./shopingcar.component.css']
})
export class ShopingcarComponent implements OnInit {
  listproducts = {}

  constructor(    private cookieService: CookieService
        ) { }

  ngOnInit(): void {
  }

}
