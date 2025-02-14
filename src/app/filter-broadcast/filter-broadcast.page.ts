import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-filter-broadcast',
  templateUrl: './filter-broadcast.page.html',
  styleUrls: ['./filter-broadcast.page.scss'],
})
export class FilterBroadcastPage implements OnInit {

  Category_id:string='';
  categories:any=[{id:'latest', name:'Latest'}, {id:'old', name:'Old'}];

  constructor(private modalCtrl: ModalController, private commonService: CommonService) { }

  ngOnInit() {
  }

  onFilter() {
    if (this.Category_id == '') {
      this.commonService.showToastMessage('Please select category.', 'error-toast', 'top', 2000);
      return;
    }
    this.modalCtrl.dismiss({filteredData: this.Category_id });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
