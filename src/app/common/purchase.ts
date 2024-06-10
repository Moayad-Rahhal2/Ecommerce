import {Customer} from "./customer";
import {Order} from "./order";
import {OrderItem} from "./order-item";

export class Purchase {

  customer:Customer;
  shippingAddress:string;
  billingAddress:string;
  order:Order;
  orderItems:OrderItem[];
}
