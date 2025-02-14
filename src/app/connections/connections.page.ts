import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.page.html',
  styleUrls: ['./connections.page.scss'],
})
export class ConnectionsPage implements OnInit {

  // connection:any;
  @Input() connections: any;
  @Input() search_name!: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.connections);
  }


  dismiss() {
    this.modalCtrl.dismiss();
  }

}
