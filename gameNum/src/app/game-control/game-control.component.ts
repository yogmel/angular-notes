import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  counter = 0;
  gameId;
  @Output() counterNow = new EventEmitter<number>();
  
  startGame() {
    this.gameId = setInterval(() => {
      this.counterNow.emit(this.counter++);
    },
      1000
    )
  }

  stopGame() {
    clearInterval(this.gameId);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
