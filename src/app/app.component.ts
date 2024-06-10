import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ProductListComponent} from "./component/product-list/product-list.component";
import {HttpClientModule} from "@angular/common/http";
import {ProductCategoryMenuComponent} from "./component/product-category-menu/product-category-menu.component";
import {SearchComponent} from "./component/search/search.component";
import {CartStatusComponent} from "./component/cart-status/cart-status.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, RouterLink, RouterLinkActive, ProductCategoryMenuComponent, SearchComponent, CartStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[HttpClientModule]
})
export class AppComponent {
  title = 'angular-ecommerce';
}
