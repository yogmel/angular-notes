import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CounterService {
  activeToInactiveCounter: number = 0;
  inactiveToActiveCounter: number = 0;

  addATICounter() {
    this.activeToInactiveCounter++;
    console.log('Active to inactive counter: ', this.activeToInactiveCounter);
  }

  addITACounter() {
    this.inactiveToActiveCounter++;
    console.log('Inactive to active counter: ', this.inactiveToActiveCounter);
  }
}