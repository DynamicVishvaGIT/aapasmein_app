import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GlobalsearchPage } from '../globalsearch/globalsearch.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-commonsearch',
  templateUrl: './commonsearch.component.html',
  styleUrls: ['./commonsearch.component.scss'],
})
export class CommonsearchComponent  implements OnInit {

  @Input() URL!: boolean;

  myTimeout:any;
  address:string='';
  
  constructor(private modalCtrl: ModalController, private changeDetectorRef: ChangeDetectorRef, private router: Router, private geolocation: Geolocation, private http: HttpClient) { }

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      const lat = resp.coords.latitude;
      const lng = resp.coords.longitude;

      this.reverseGeocode(lat, lng);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  reverseGeocode(lat: number, lng: number) {
    const apiKey = 'AIzaSyDinqEFwSCs66zyeb1WwpjmklkC8pio99k';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    this.http.get(url).subscribe((result: any) => {
      if (result.status === 'OK') {
        const addressComponents = result.results[0].formatted_address;

        // Remove Plus Code if present
        this.address = this.filterPlusCode(addressComponents);
        // alert(JSON.stringify(this.address));
      } else {
        this.address = 'Location not found';
      }
    }, (error) => {
      console.log('Error with reverse geocoding:', error);
      this.address = 'Error retrieving location';
    });
  }

  filterPlusCode(address: string): string {
    // This regex will filter out Plus Codes like 'M3QM+2RJ'
    // return address.replace(/^[A-Z0-9]+\+\w+\s*/, '');
    const cleanedAddress = address.replace(/^[A-Z0-9]+\+\w+,\s*/, '');
    return cleanedAddress.trim();
  }

  onSearch(ev:any, type:string) {
    this.myTimeout = setTimeout(() => {
      this.goToSearch(ev, type); 
      }, -99999999);
  }

  async goToSearch(ev:any, type:string) {
    console.log(ev.target.value);
    this.changeDetectorRef.detectChanges();
    this.router.navigate(['/globalsearch'], { queryParams: { searchText: ev.target.value, type: type} });
    // let modal = await this.modalCtrl.create({ component: GlobalsearchPage, componentProps:{searchText: ev.target.value, type:type }});
    // //modal.present();
    // modal.onDidDismiss().then((modalItem) => {
    //   if (modalItem) {
    //     //console.log(modalItem.data.signedUser);
        
    //   }
    // })
    // return await modal.present();
  }

}
