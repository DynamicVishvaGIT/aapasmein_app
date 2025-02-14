import { Inject, Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl = 'https://aapasmein.dvadminpanel.in/'; //Dev API
  isLoading = false;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private loadingController: LoadingController, private toastCtrl: ToastController) { }

  getBaseURL() {
    return this.baseUrl;
  }

  findItem(array: any, key: string, value: string, ignorecase?:boolean) {
    for (let index = 0; index < array.length; index++) {
      let value1 = array[index][key];
      let value2 = value;
      if(ignorecase) {
        value1 = value1.toLowerCase();
        value2 = value2.toLowerCase();
      }
      if (value1 == value2) {
        return index;
      }
    }
    return -1;
  }

  findTwoItem(array: any, key1: string, value1: string, key2: string, value2: string) {
    for (let index = 0; index < array.length; index++) {
      if (array[index][key1] == value1 && array[index][key2] == value2) {
        return index;
      }
    }
    return -1;
  }

  async showToastMessage(message: string, css: string, location:any, duration: number) {
    if (location){
      location = location;
    }
    else{
      location='top';
    }
    let toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: location,
      cssClass: css
    });

    await toast.present();
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Loading...',
      //duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }


  async presentToast(message:string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
    });
    await toast.present();
  }
  
  setItem(key: string, value: any) {
    this.storage.set(key, value);
  }
  
  getItem(key: string) {
    let value = this.storage.get(key) || undefined;
    return value;
  }
  
  removeItem(key: string) {
    this.storage.remove(key);
  }
  
  removeAll() {
    this.storage.clear();
  }

  errorHandler(error:any=Response) {console.log(error);
    let message = (error['error']) ? ((error['error'].error) ? error['error'].error : error['message']) : error['message'];
    return throwError(message || 'Remote server unreachable. Please check your Internet connection.');
  }
}
