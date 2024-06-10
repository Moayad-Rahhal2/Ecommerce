import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CheckoutService} from "../../services/checkout.service";
import {NgForOf, NgIf} from "@angular/common";
import {Country} from "../../common/country";
import {State} from "../../common/state";
import {WhiteSpace} from "../../validators/white-space";
import {CartService} from "../../services/cart-service";
import {map} from "rxjs";
import {PurchaseService} from "../../services/purchase.service";
import {Router} from "@angular/router";
import {Order} from "../../common/order";
import {OrderItem} from "../../common/order-item";
import {Purchase} from "../../common/purchase";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {response} from "express";


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  checkoutFormGroup: FormGroup;
  totalPrice:number=0.00;
  totalQuantity:number=0;
  creditCardYears:number[]=[];
  creditCardMonths:number[]=[];

  countries:Country[]=[];

  shippingAddressStates:State[]=[];
  billingAddressStates:State[]=[];


  constructor(private formBuilder: FormBuilder,private checkService:CheckoutService,private cartService:CartService,private purchaseService:PurchaseService,private router:Router) {
  }

    ngOnInit(): void {

    this.reviewCartDetail();

    this.checkoutFormGroup=this.formBuilder.group({
      customer : this.formBuilder.group({
        firstName : new FormControl("", [Validators.required,Validators.maxLength(50),Validators.minLength(2),WhiteSpace.noWhiteSpace]),
        lastName :  new FormControl("", [Validators.required,Validators.maxLength(50),Validators.minLength(2),WhiteSpace.noWhiteSpace]),
        // email : new FormControl ("", [Validators.required,Validators.email])
        email : new FormControl ("", [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress : this.formBuilder.group({
        country: new FormControl("", Validators.required),
        street: new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(2),WhiteSpace.noWhiteSpace]),
        city: new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(2),WhiteSpace.noWhiteSpace]),
        state:  new FormControl("", Validators.required),
        zipcode:  new FormControl('', [Validators.required,Validators.pattern('[0-9]{5}')])
      }),
      billingAddress : this.formBuilder.group({
        country:  new FormControl("", Validators.required),
        street: new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(2),WhiteSpace.noWhiteSpace]),
        city: new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(2),WhiteSpace.noWhiteSpace]),
        state:  new FormControl("", Validators.required),
        zipcode: new FormControl('', [Validators.required,Validators.pattern('[0-9]{5}')])
      }),
      creditCard : this.formBuilder.group({
        cardType:new FormControl("", Validators.required),
        nameOnCard:new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(2),WhiteSpace.noWhiteSpace]),
        cardNumber: new FormControl('', [Validators.required,Validators.pattern('[0-9]{16}')]),
        securityCode:new FormControl('', [Validators.required,Validators.pattern('[0-9]{3}')]),
        expirationMonth:new FormControl("", Validators.required),
        expirationYear: new FormControl("", Validators.required)
      })
    });

const startMonth:number=new Date().getMonth()+1;
this.checkService.getCreditCardMonths(startMonth).subscribe(data=>this.creditCardMonths=data);
this.checkService.getCreditCardYear().subscribe(data=>this.creditCardYears=data);



this.checkService.getCountries().subscribe(data=> this.countries = data);


  }





  copyShippingAddressToBillingAddress(event:any) {
if (event.target.checked){
  this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
  this.billingAddressStates=this.shippingAddressStates;
} else {
  this.checkoutFormGroup.controls['billingAddress'].reset();
  this.billingAddressStates=[];
}
  }

  handleMonthForYear() {
    const creditCardFormGroup=this.checkoutFormGroup.get('creditCard');
    const currentYear:number=new Date().getFullYear();
    const selectedYear:number=Number(creditCardFormGroup.value.expirationYear);
    let startMonth:number;
    if (currentYear==selectedYear){
    startMonth=new Date().getMonth()+1;
    }else {
    startMonth=1;
    }
    this.checkService.getCreditCardMonths(startMonth).subscribe(data=>this.creditCardMonths=data);
    this.checkService.getCreditCardYear().subscribe(data=>this.creditCardYears=data);
  }







  getStates(formGroupName:string) {
  const formGroup=this.checkoutFormGroup.get(formGroupName);
  // const countryCode=formGroup.value.country.code;
  // console.log(this.checkoutFormGroup.get(formGroupName).value.country);

  // me
  const countryName=this.checkoutFormGroup.get(formGroupName).value.country;
  const sadShit=this.checkService.getStatesMe(countryName);

  // this.checkService.getStates(countryCode).subscribe(data=> {
  //     if (formGroupName == 'shippingAddress') {
  //       this.shippingAddressStates = data;
  //     } else {
  //       this.billingAddressStates = data
  //     }
  //     formGroup.get('state').setValue(data[0]);
  //   }
  // )

    sadShit.subscribe(data=> {
        if (formGroupName == 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data
        }
        formGroup.get('state').setValue(data[0]);
      }
    )

  }

  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}

  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipcode');}
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country');}
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state');}


  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipcode');}
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country');}
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state');}


  get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType');}
  get creditCardNameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode');}


  private reviewCartDetail() {
  this.cartService.totalPrice.subscribe(data=>this.totalPrice=data);
  this.cartService.totalQuantity.subscribe(data=>this.totalQuantity=data);
  console.log(this.totalPrice+' '+this.totalQuantity);
  }

  onSubmit() {
  // check validations
    if (this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    // set up order
    let order=new Order();
    order.totalQuantity=this.totalQuantity;
    order.totalPrice=this.totalPrice;

    // get cart items
    const cartItems=this.cartService.cartItems;

    // create order item form cart item
    // long way so it will be commented
    // let orderItem:OrderItem[]=[];
    // for (let i=0;i<cartItems.length;i++){
    //   orderItem[i]=new OrderItem(cartItems[i]);
    // }


    // create order item form cart item
    // short way
    let orderItemsShort:OrderItem[]=cartItems.map(tempCartItem=>new OrderItem(tempCartItem));


    // set up purchase
    let purchase=new Purchase();

    // populate purchase with customer

    purchase.customer=this.checkoutFormGroup.controls['customer'].value;


    // populate purchase with shipping address
    purchase.shippingAddress=this.checkoutFormGroup.controls['shippingAddress'].value;
    // const shippingState:State=JSON.parse(JSON.stringify(purchase.shippingAddress.state))
    // from me the commented above from him
    const shippingState:State=this.checkoutFormGroup.controls['shippingAddress'].value.state;
    const shippingCountry:Country=this.checkoutFormGroup.controls['shippingAddress'].value.country;
    // video 215 section 24 min 1:30


    // populate purchase with billing address
    purchase.billingAddress=this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState:State=this.checkoutFormGroup.controls['billingAddress'].value.state;
    const billingCountry:Country=this.checkoutFormGroup.controls['billingAddress'].value.country;


    // populate purchase with order and orderItems
    purchase.order=order;
    purchase.orderItems=orderItemsShort;

    // calling REST API via Purchase Service
    this.purchaseService.placeOrder(purchase).subscribe({
      next:response=>{
        alert(`Your order is complete.`);
        this.resetCart();
      },
      error:err => {
        alert(`There was an error: ${err.message}`);
      }
    })


  }


  private resetCart() {
    // rest cart data
    this.cartService.cartItems=[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    // back to product page
    this.router.navigateByUrl("/products")
  }
}


