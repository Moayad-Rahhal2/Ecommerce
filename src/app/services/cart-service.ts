import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

// to make the button change the quantity of items in cart and total price
// to add items to cart
export class CartService {

  cartItems:CartItem[]=[];

  // Subject is subclass for Observable
  // used to publish events to all subscriber
  totalPrice: Subject<number>=new BehaviorSubject<number>(0);
  totalQuantity: Subject<number>=new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(cartItem:CartItem){
    let alreadyExistInCart:boolean=false;
    let existingCartItem: CartItem= undefined;

    if (this.cartItems.length > 0){

      existingCartItem=this.cartItems.find(ci=>ci.id===cartItem.id)

    alreadyExistInCart=(existingCartItem != undefined);
    }
if (alreadyExistInCart){
  existingCartItem.quantity++;
} else {
  this.cartItems.push(cartItem);
}
  this.getNewPrice();
  }

  private getNewPrice() {
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;
    for (let item of this.cartItems){
      totalPriceValue += item.quantity * item.unitPrice;
      totalQuantityValue += item.quantity;
    }
    // error cause totalPriceValue is number and total price is Subject<number>
    // this.totalPrice=totalPriceValue;
    // this.totalQuantity=totalQuantityValue;
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    // next use to publish events
  }

  computeCartTotal() {
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;
    for (let item of this.cartItems) {
      totalPriceValue += item.quantity * item.unitPrice;
      totalQuantityValue += item.quantity;
    }
      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalQuantityValue);

  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if(cartItem.quantity == 0){
    this.remove(cartItem);
    } else{
      this.computeCartTotal();
    }
  }

   remove(cartItem: CartItem) {
    // this line is IntelliJ IDEA suggestion the comment from video, and it's work better than the code in the video
    const itemIndex=this.cartItems.indexOf(cartItem);
    //const itemIndex=this.cartItems.findIndex(tempCartItem => tempCartItem.id== cartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotal();
    }
  }
}
