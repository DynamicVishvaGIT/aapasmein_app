import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-addmall',
  templateUrl: './addmall.page.html',
  styleUrls: ['./addmall.page.scss'],
})
export class AddmallPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  mallJson:any={category_id:'',sub_category_id:'',product_name:'',description:'',price:'',location_id:'',share_with:'public'};
  get_locations:any=[];
  get_categories:any=[];
  get_mall_sub_categories:any=[];
  // selectedRadio:string='public';
  acceptTerms:boolean=false;
  selectedImage1:any={name:'', data:''};
  selectedImage2:any={name:'', data:''};
  selectedImage3:any={name:'', data:''};
  product_images:any=[];
  imageIndex:number=-1;
  disabled:boolean=false;

  constructor(private modalCtrl: ModalController, private apiService: ApiService, private commonService: CommonService, private actionSheetController: ActionSheetController,
    private camera: Camera, private router: Router ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.get_location();
    this.get_category();
  }

  get_location() {
    this.apiService.get_location()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_locations = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
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

  load_mall_subcategory() {
    this.apiService.load_mall_subcategory(this.mallJson.category_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_mall_sub_categories = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  async presentActionSheet(index:number) {
    console.log(index);
    this.imageIndex = index;
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Select photo from Gallery',
          icon: 'images',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Open Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true   // ✅ Add this line
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is a base64 encoded string
      //this.blogJson.blog_img = 'data:image/jpeg;base64,' + imageData; // Set base64 image
      var d = new Date(),
      n = d.getTime(),
      fileName = n + ".jpg";
      this.checkImageSizeAndUpload(fileName,imageData);
      // if(this.imageIndex==1){
      //   this.selectedImage1 = { name: fileName, data: `data:image/jpeg;base64,${imageData}`};
      //   this.product_images.push(this.selectedImage1);
      // }
      // else if(this.imageIndex==2){
      //   this.selectedImage2 = { name: fileName, data: `data:image/jpeg;base64,${imageData}`};
      //   this.product_images.push(this.selectedImage2);
      // }
      // else if(this.imageIndex==3){
      //   this.selectedImage3 = { name: fileName, data: `data:image/jpeg;base64,${imageData}`};
      //   this.product_images.push(this.selectedImage3);
      // }
      //alert(JSON.stringify(this.album_images));
    }, (err) => {
      console.log('Error obtaining picture', err);
    });
  }

  async checkImageSizeAndUpload(fileName:string,imageData:any) {
    // Convert base64 data URL to Blob
    let response = await fetch(`data:image/jpeg;base64,${imageData}`);
    let blob = await response.blob();
  
    const maxSizeMB = 5;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (blob.size > maxSizeBytes) {
      this.commonService.showToastMessage(`Image size exceeds ${maxSizeMB} MB. Please select a smaller image.`, 'error-toast', '', 4000);
      return;
    }
    // Proceed with upload if size is acceptable
    if(this.imageIndex==1){
      this.selectedImage1 = { name: fileName, data: `data:image/jpeg;base64,${imageData}`};
      this.product_images.push(this.selectedImage1);
    }
    else if(this.imageIndex==2){
      this.selectedImage2 = { name: fileName, data: `data:image/jpeg;base64,${imageData}`};
      this.product_images.push(this.selectedImage2);
    }
    else if(this.imageIndex==3){
      this.selectedImage3 = { name: fileName, data: `data:image/jpeg;base64,${imageData}`};
      this.product_images.push(this.selectedImage3);
    }
  }

  async add_mall_products() {
    if (this.mallJson.category_id == '') {
      this.commonService.showToastMessage('Please select category.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.mallJson.sub_category_id == '') {
      this.commonService.showToastMessage('Please select sub category.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.mallJson.product_name == '') {
      this.commonService.showToastMessage('Please enter product name.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.mallJson.description == '') {
      this.commonService.showToastMessage('Please enter descriptiopn.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.mallJson.price == '') {
      this.commonService.showToastMessage('Please select price.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.mallJson.location_id == '') {
      this.commonService.showToastMessage('Please select product location.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.product_images.length== 0) {
      this.commonService.showToastMessage('Please upload at least one product image.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.mallJson.share_with == '') {
      this.commonService.showToastMessage('Please select share with.', 'error-toast', 'top', 2000);
      return;
    }
    this.disabled = true;
    let formData = new FormData();
    for(let i=0;i<this.product_images.length;i++){
      let response = await fetch(this.product_images[i].data);
      let blob = await response.blob();
      if(this.product_images[i].name==''){
        formData.append('product_images[]','');
      }
      else{
        formData.append('product_images[]' , blob, this.product_images[i].name); 
      }
    }
    formData.append("category_id",this.mallJson.category_id),
    formData.append("sub_category_id",this.mallJson.sub_category_id),
    formData.append("product_name",this.mallJson.product_name),
    formData.append("description",this.mallJson.description),
    formData.append("price",this.mallJson.price),
    formData.append("location_id",this.mallJson.location_id),
    formData.append("share_with",this.mallJson.share_with),
    formData.append("user_id",this.currentUser.user_id),
    console.log(this.mallJson);
    this.apiService.add_mall_products(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.disabled = false;
        this.commonService.showToastMessage(response.message, 'success-toast','', 2000);
        this.dismiss();
        this.router.navigate(['/my-mall']);
      },
      respError => {
        this.disabled = false;
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  onRadioSelect(value: string) {
    this.mallJson.share_with = value;
    console.log(this.mallJson.share_with);
  }

  dismiss() {
    this.modalCtrl.dismiss();
    // this.router.navigate(['/aapasmein-mall']);
  }

}
