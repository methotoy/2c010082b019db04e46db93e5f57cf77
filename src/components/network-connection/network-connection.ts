import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'network-connection',
  templateUrl: 'network-connection.html'
})
export class NetworkConnectionComponent implements OnInit {

  public networkStatusMessage: string;
  public connected: boolean = true;

  constructor(
    private net: Network
  ) {
  }

  ngOnInit() {
    Observable.merge(this.net.onConnect(), this.net.onDisconnect())
    .subscribe(e => {
      if (e && e.type === "offline") {
        this.networkStatusMessage = "No Internet Connection";
        this.connected = false;
      } else if (e && e.type === "online") {
        this.networkStatusMessage = 'Connected';
        this.connected = true;

        setTimeout(() => {
          this.networkStatusMessage = null;
        }, 3000);
      }
      console.log(e,this.connected);
    }, err => console.error(err));
  }

}
