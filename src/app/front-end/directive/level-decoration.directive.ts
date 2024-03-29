import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appLevelDecoration]'
})
export class LevelDecorationDirective implements AfterViewInit{

   @Input() appLevelDecoration: string | undefined

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.style.backgroundImage =
      `url("../../../../../../assets/images/${this.appLevelDecoration}.gif")`
  }
}
