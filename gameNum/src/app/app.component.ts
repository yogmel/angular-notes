import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gameNum';
  counters = [];

  handleCounterChange(counter){
    this.counters.push(counter);
  }

}
