import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAutoresize]'
})
export class AutoresizeDirective implements AfterViewInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const childrenW = this.el.nativeElement.offsetWidth;
      const parentW = this.el.nativeElement.parentNode.offsetWidth;
      if(childrenW > parentW) {
        this.el.nativeElement.style.fontSize = '0.8em';
      }
    }, 50);
  }

}
