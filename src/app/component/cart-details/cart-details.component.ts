import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart-service";
import {CartItem} from "../../common/cart-item";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{

  cartItems : CartItem[]=[];
  totalPrice:number=0.00;
  totalQuantity:number=0;

  constructor(private cartService: CartService)  {
  }

  ngOnInit(): void {
      this.listCartDetail();
    }

  private listCartDetail() {
    // this a variable type of number
    this.cartItems=this.cartService.cartItems;
    // these are Subject<number> variables
    this.cartService.totalPrice.subscribe(data=>this.totalPrice=data);
    this.cartService.totalQuantity.subscribe(data=>this.totalQuantity=data);

    // to compute or calculate total price and total quantity
    this.cartService.computeCartTotal();
  }

  incrementQuantity(cartItem:CartItem) {
  this.cartService.addToCart(cartItem);

  }
  decrementQuantity(cartItem:CartItem) {
  this.cartService.decrementQuantity(cartItem);
  }

  removeCartItem(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }
}
