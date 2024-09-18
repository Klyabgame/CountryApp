import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries:Country[]=[];

  constructor(
    private readonly countriesService:CountriesService
  ){}


  /* @ViewChild('')
  private searchEnter:EventEmitter<string>=new EventEmitter(); */


  searchByCapital(term:string):void{
    
    this.countriesService.searchCapital(term)
    .subscribe(countries=>{
      this.countries=countries;
    });
    
    
  }

}
