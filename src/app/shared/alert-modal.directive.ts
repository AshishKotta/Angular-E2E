import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAlertModalDirective]'
})
export class AlertModalDirective {

  constructor(public containerRef: ViewContainerRef) { }

}
