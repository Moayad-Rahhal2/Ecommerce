import { OrderItem } from './order-item';
import {CartItem} from "./cart-item";
import {Product} from "./product";

describe('OrderItem', () => {
  it('should create an instance', () => {
    expect(new OrderItem(new CartItem(new Product(2,'','','',0,'',false,0,new Date(),new Date())))).toBeTruthy();
  });
});
