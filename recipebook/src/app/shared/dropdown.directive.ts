import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') toggleOpen() {
    const siblingEl = this.el.nativeElement.nextSibling;
    const isShown = siblingEl.classList.contains('show');

    this.renderer[isShown ? 'removeClass' : 'addClass'](siblingEl, 'show');
  }
}
