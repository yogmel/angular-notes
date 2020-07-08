import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  status = '';

  constructor() {
    this.getServerStatus();
  }

  ngOnInit(): void {
  }

  getServerStatus() {
    this.status = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getColor() {
    return this.status === 'online' ? 'green' : 'red';
  }

}
