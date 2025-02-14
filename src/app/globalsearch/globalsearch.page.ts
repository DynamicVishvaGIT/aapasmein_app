import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { GlobalsearchdetailsPage } from '../globalsearchdetails/globalsearchdetails.page';

@Component({
  selector: 'app-globalsearch',
  templateUrl: './globalsearch.page.html',
  styleUrls: ['./globalsearch.page.scss'],
})
export class GlobalsearchPage implements OnInit {

  // @Input() searchText!: string;
  // @Input() type!: string;
  searchText:string = '';
  type:string='';

  constructor(private modalCtrl: ModalController, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchText = params['searchText'];
      console.log(this.searchText);
      this.type = params['type'];
    });
    // this.searchText = this.navParams.get('searchText');  //for showing search text in listing page
    // this.type = this.navParams.get('type');
  }

  async goToDetails(text:string) {
    this.router.navigate(['/globalsearchdetails'], { queryParams: { searchText: text} });
    // let modal = await this.modalCtrl.create({ component: GlobalsearchdetailsPage, componentProps:{searchText: text }});
    // modal.onDidDismiss().then((modalItem) => {
    //   if (modalItem) {
        
    //   }
    // })
    // return await modal.present();
  }

  backToDashboard() {
    // this.modalCtrl.dismiss();
    this.router.navigate(['/dashboard']);
  }

}
