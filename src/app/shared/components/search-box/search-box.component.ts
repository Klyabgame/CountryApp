import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, output, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  
  

  private debouncer:Subject<string>=new Subject<string>();
  private debouncerSuscription?:Subscription;


  @Output()
  public searchEnter:EventEmitter<string>=new EventEmitter();
  @Output()
  public onDebounce:EventEmitter<string>=new EventEmitter();

  @Input()
  public placeholder:string='';

  @Input()
  public initialValue:string='';

  

  ngOnInit(): void {
    this.debouncerSuscription=this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value=>{
      this.onDebounce.emit(value);
      
    })
  }
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();

  }

  emitValue(value:string):void{
    this.searchEnter.emit(value);
  }

  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm);
  }

}
