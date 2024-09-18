import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {


  public region:Country[]=[];

  constructor(
    private readonly countriesService:CountriesService
  ){}


  /* @ViewChild('')
  private searchEnter:EventEmitter<string>=new EventEmitter(); */


  searchByRegion(term:string):void{
    
    this.countriesService.searchRegion(term)
    .subscribe(countries=>{
      this.region=countries;
    });
    
    
  }

}
