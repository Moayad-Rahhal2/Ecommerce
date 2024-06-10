import { CartItem } from './cart-item';
import {Product} from "./product";

describe('CartItem', () => {
  it('should create an instance', () => {
    expect(new CartItem(new Product(1,"","","",0,"",false,0,new Date(),new Date()))).toBeTruthy();
  });
});
