import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CurrencyPipe} from "@angular/common";
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart-service";


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

// the ! before : for not null so this product can't be null
product !: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute,private cartService:CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ProductDetails();
    })
  }

  private ProductDetails() {
    const productId:number= +this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(productId).subscribe(data => {this.product=data})
  }

  addToCart(tempProduct: Product) {
      const cartItem:CartItem=new CartItem(tempProduct);
      this.cartService.addToCart(cartItem);

  }
}
