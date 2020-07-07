import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  showMessage = false;
  clicksArr = [];
  counter = 0;

  constructor() { }

  ngOnInit(): void {
  }

  handleBtnClick() {
    this.showMessage = !this.showMessage;
    this.clicksArr.push(this.counter++);
  }
}
