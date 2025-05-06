import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

  constructor(private _el:ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const intialValue = this._el.nativeElement.value;
    if(intialValue == 0) {
      this._el.nativeElement.value = "";
    } else {
      this._el.nativeElement.value = intialValue.replace(/[^0-9]*/g, "");
      if(intialValue !== this._el.nativeElement.value) {
        event.stopProagration();
      }
    }
  }
}
