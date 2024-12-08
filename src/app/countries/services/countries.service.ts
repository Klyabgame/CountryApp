import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';



@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    private readonly apiUrl:string='https://restcountries.com/v3.1';

    public cacheStore:CacheStore={
        byCapital:  {term:'' , countries:[]},
        byCountries:{term:'' , countries:[]},
        byRegion:   {region:'' , countries:[]}
    }

    constructor(
        private readonly http:HttpClient
    ){
        this.loadFromLocalStorage();
    }

    private saveToLocalStorage(){
        localStorage.setItem('cacheStore',JSON.stringify(this.cacheStore));
    }

    private loadFromLocalStorage(){
        if(!localStorage.getItem('cacheStore')) return;

        this.cacheStore=JSON.parse(localStorage.getItem('cacheStore')!);
    }

    searchCountryByAlphaCode(code:string):Observable<Country | null>{

        return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
        .pipe(
            map(countries=>countries.length > 0 ? countries[0] : null),
            catchError(error=> of(null)));

    }

    private getCountriesRequest(url:string):Observable<Country[]>{

        return this.http.get<Country[]>(url)
        .pipe(
            catchError(error=> of([]))
        );
    }
    

    searchCapital(term:string):Observable<Country[]>{

        const urlCapital=`${this.apiUrl}/capital/${term}`;

        return this.getCountriesRequest(urlCapital)
        .pipe(
            tap(countries=> this.cacheStore.byCapital={term:term, countries:countries}),
            tap(()=>this.saveToLocalStorage())
        );

    }

    searchCountry(term:string):Observable<Country[]>{

        const urlCountry= `${this.apiUrl}/name/${term}`;

        return this.getCountriesRequest(urlCountry)
        .pipe(
            tap(countries=> this.cacheStore.byCountries={term:term, countries:countries}),
            tap(()=>this.saveToLocalStorage())
        );
        
    }

    searchRegion(region:Region):Observable<Country[]>{

        const urlRegion=`${this.apiUrl}/region/${region}`;

        return this.getCountriesRequest(urlRegion)
        .pipe(
            tap(countries=> this.cacheStore.byRegion={region:region, countries:countries}),
            tap(()=>this.saveToLocalStorage())
        );
    }


}