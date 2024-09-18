import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {



  @Output()
  public searchEnter:EventEmitter<string>=new EventEmitter();

  @Input()
  public placeholder:string='';

  emitValue(value:string):void{
    this.searchEnter.emit(value);
    
  }

}
