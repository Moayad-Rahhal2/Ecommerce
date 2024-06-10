import { Routes } from '@angular/router';
import path from "node:path";
import {ProductListComponent} from "./component/product-list/product-list.component";
import {ProductDetailsComponent} from "./component/product-details/product-details.component";
import {CartDetailsComponent} from "./component/cart-details/cart-details.component";
import {CheckoutComponent} from "./component/checkout/checkout.component";

export const routes: Routes = [
  {path:'category/:id', component : ProductListComponent},
  {path:'category', component : ProductListComponent},
  {path:'products', component : ProductListComponent},
  {path:'search/:keyword', component : ProductListComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path:'cart-detail', component : CartDetailsComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'}   // nothing
  // {path: '**' , redirectTo: '/products', pathMatch:'full'} // wild card component : pageNotFound
];
