import {Component, OnInit} from '@angular/core';
import {ProductCategory} from "../../common/product-category";
import {ProductService} from "../../services/product.service";
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit{

  productCategory : ProductCategory[]=[];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.listProductCategories();
  }

   listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategory=data;
      }
    )
  }
}
