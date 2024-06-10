import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../common/product";
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl="http://localhost:8080/api/products";

  private categoryUrl = "http://localhost:8080/api/product-category";


  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId:number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.getProduct(searchUrl);
  }

  getProductCategories() : Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(map(response => response._embedded.productCategory) );

  }


  searchProducts(keyword: string) : Observable<Product[]> {
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProduct(searchUrl);
  }

  private getProduct(searchUrl: string) : Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductById(productId: number):Observable<Product> {
    const searchUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(searchUrl);
  }
  getProductListPaginate(pageNumber:number,pageSize:number,categoryId:number):Observable<GetResponseProduct>{
    const url=`${this.baseUrl}/search/findByCategoryId`+`?id=${categoryId}&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProduct>(url);
  }
  searchProductsPaginate(pageNumber:number,pageSize:number,keyword:string):Observable<GetResponseProduct>{
    const url=`${this.baseUrl}/search/findByNameContaining`+`?name=${keyword}&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProduct>(url);
  }

}



interface GetResponseProduct {
  _embedded:{
    products:Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPage:number,
    number:number
  }
}
// for category method getProductCategories
interface  GetResponseCategory {
  _embedded:{
    productCategory:ProductCategory[];
  }
}

