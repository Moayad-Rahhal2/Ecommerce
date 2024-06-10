import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product(1,"","","",0,"",false,0,new Date(),new Date())).toBeTruthy();
  });
});
