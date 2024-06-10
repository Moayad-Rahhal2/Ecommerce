import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart-service";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    NgIf,
    RouterLink,
    NgbPagination
  ],
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  // to use in html
  products: Product[]=[];
  currentCategoryId:number;
  previousCategoryId:number;

  searchMode:boolean=false;
  previousKeyWord:string;

  // pagination
  // for pageNumber if the method I do -1 like this this.pageNumber -1
  pageNumber:number=1;
  pageSize:number=12;
  totalElements:number=0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService:CartService) { }

  // like post construct
  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.listProduct();
    });
}

listProduct(): void {

  this.searchMode= this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProduct();
    } else {
      this.handleListProduct();
    }
}

    handleListProduct(): void {
      const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');
      if(hasCategoryId){
        // get param string and convert it into number using + symbol
        this.currentCategoryId= +this.route.snapshot.paramMap.get('id');
      }
      else{
        this.currentCategoryId=1;
      }

      // check categoryId for pagination
      if (this.previousCategoryId != this.currentCategoryId){
        this.pageNumber=1;
      }
      this.previousCategoryId=this.currentCategoryId;

      this.productService.getProductListPaginate(this.pageNumber-1,this.pageSize,this.currentCategoryId).subscribe(data => {this.products = data._embedded.products;this.pageNumber=data.page.number+1;this.pageSize=data.page.size; this.totalElements=data.page.totalElements;});
    }


  private handleSearchProduct() {
    const keyword: string=this.route.snapshot.paramMap.get('keyword');
    if (this.previousKeyWord !=keyword){
        this.pageNumber=1;
    }
    this.previousKeyWord=keyword;
    this.productService.searchProductsPaginate(this.pageNumber-1,this.pageSize,keyword).subscribe(data =>{ this.products = data._embedded.products;this.pageNumber=data.page.number+1;this.pageSize=data.page.size;this.totalElements=data.page.totalElements});
  }

  updatePageSize(value: string) {
    this.pageSize= +value;
    this.pageNumber= 1;
    this.listProduct();
  }

  addToCart(product:Product) {
    const cartItem:CartItem=new CartItem(product);
    this.cartService.addToCart(cartItem);
  }
}
