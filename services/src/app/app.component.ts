import { Component, OnInit } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeToInactiveCounter: number = 0;
  inactiveToActiveCounter: number = 0;

  constructor(private counterService: CounterService) {}

  ngOnInit() {
    this.activeToInactiveCounter = this.counterService.activeToInactiveCounter;
    this.inactiveToActiveCounter = this.counterService.inactiveToActiveCounter;
  }
}
