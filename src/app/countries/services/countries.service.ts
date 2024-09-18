import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';



@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    private readonly apiUrl:string='https://restcountries.com/v3.1'

    constructor(
        private readonly http:HttpClient
    ){}

    searchCountryByAlphaCode(code:string):Observable<Country | null>{

        return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
        .pipe(
            map(countries=>countries.length > 0 ? countries[0] : null),
            catchError(error=> of(null)));

    }

    searchCapital(term:string):Observable<Country[]>{

        return this.http.get<Country[]>(`${this.apiUrl}/capital/${term}`)
        .pipe(
            catchError(error=> of([])));
    }

    searchCountry(term:string):Observable<Country[]>{

        return this.http.get<Country[]>(`${this.apiUrl}/name/${term}`)
        .pipe(
            catchError(error=> of([])));
    }

    searchRegion(region:string):Observable<Country[]>{

        return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`)
        .pipe(
            catchError(error=> of([])));
    }


}