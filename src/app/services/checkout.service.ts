import { Injectable } from '@angular/core';
import {map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Country} from "../common/country";
import {State} from "../common/state";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private countryUrl='http://localhost:8080/api/countries';
  private stateUrl='http://localhost:8080/api/states';


  constructor(private httpClient:HttpClient) { }

  getCreditCardMonths(startMonth:number): Observable<number[]>{
    let data:number[]=[];

    for (let month=startMonth; month<=12; month++) {
      data.push(month);
    }

    return of(data);
  }

  getCreditCardYear():Observable<number[]>{
    let data:number[]=[];
     const startYear:number=new Date().getFullYear();
     const endYear:number=startYear+10;
     for (let year=startYear; year<=endYear; year++) {
       data.push(year);
     }
    return of(data);
  }

  getCountries():Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countryUrl).pipe(map(response=>response._embedded.countries));
  }

  getStates(countryCode:string):Observable<State[]>{
    const searchUrl=`${this.stateUrl}/search/findByCountryCode?code=${countryCode}`;
    return this.httpClient.get<GetResponseStates>(searchUrl).pipe(map(response=>response._embedded.states));
  }
  // from me
  getStatesMe(countryName:string):Observable<State[]>{
    const searchUrl=`${this.stateUrl}/search/findByCountryName?name=${countryName}`;
    return this.httpClient.get<GetResponseStates>(searchUrl).pipe(map(response=>response._embedded.states));
  }

}

interface GetResponseCountries{
  _embedded:{
    countries: Country[]
  }
}

interface GetResponseStates{
  _embedded:{
    states: State[]
  }
}
