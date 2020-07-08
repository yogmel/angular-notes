import { Component } from "@angular/core";

@Component({
  selector: "app-username-input",
  templateUrl: "./username-input.component.html"
})
export class UsernameInput {
  username = '';

  resetUsernameInput() {
    this.username = '';
  }
}