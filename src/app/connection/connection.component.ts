import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent  implements OnInit {

  @Input() connection!: any;

  constructor() { }

  ngOnInit() {}

}
