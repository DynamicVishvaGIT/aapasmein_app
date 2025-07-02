import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Network } from '@awesome-cordova-plugins/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private networkStatus = new BehaviorSubject<boolean>(true); // assume connected initially
  public currentStatus = this.networkStatus.asObservable();

  constructor(private network: Network) {
    this.initializeNetworkEvents();
  }

  initializeNetworkEvents() {
    const type = this.network.type;
    console.log('Initial network type:', type);
    if (type === 'none' || type === 'unknown') {
      this.networkStatus.next(false);
    } else {
      this.networkStatus.next(true);
    }

    this.network.onDisconnect().subscribe(() => {
      console.log('Network disconnected!');
      this.networkStatus.next(false);
    });

    this.network.onConnect().subscribe(() => {
      console.log('Network connected!');
      this.networkStatus.next(true);
    });
  }
}
