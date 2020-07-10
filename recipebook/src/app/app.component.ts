import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'recipebook';
  currView = 'recipes';

  onChangeView(view) {
    this.currView = view;
  }
}
