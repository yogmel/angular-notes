import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() currentView = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  changeDisplayView(view: string) {
    this.currentView.emit(view);
  }

}
