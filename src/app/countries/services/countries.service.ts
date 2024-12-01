import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
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

    private getCountriesRequest(url:string):Observable<Country[]>{

        return this.http.get<Country[]>(url)
        .pipe(
            catchError(error=> of([])),
            delay(2000)
        );
    }
    

    searchCapital(term:string):Observable<Country[]>{

        const urlCapital=`${this.apiUrl}/capital/${term}`;

        return this.getCountriesRequest(urlCapital);

    }

    searchCountry(term:string):Observable<Country[]>{

        const urlCountry= `${this.apiUrl}/name/${term}`;

        return this.getCountriesRequest(urlCountry);
        
    }

    searchRegion(region:string):Observable<Country[]>{

        const urlRegion=`${this.apiUrl}/region/${region}`;

        return this.getCountriesRequest(urlRegion);
    }


}