import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-filter-mall',
  templateUrl: './filter-mall.page.html',
  styleUrls: ['./filter-mall.page.scss'],
})
export class FilterMallPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  get_categories:any=[];
  category_id='';

  constructor(private modalCtrl: ModalController, private apiService: ApiService, private commonService: CommonService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.get_category();
  }

  get_category() {
    this.apiService.get_category()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_categories = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  onFilter() {
    if (this.category_id == '') {
      this.commonService.showToastMessage('Please select category.', 'error-toast', 'top', 2000);
      return;
    }
    let index = this.commonService.findItem(this.get_categories,'id', this.category_id);
    this.modalCtrl.dismiss({filteredData: this.category_id, filterText: this.get_categories[index].NAME });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
