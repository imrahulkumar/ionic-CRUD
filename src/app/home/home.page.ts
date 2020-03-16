import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../product';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { fromEvent } from 'rxjs';
import { PlatformLocation } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  products: any[] = [];
  isViewEnable:boolean = false;

  constructor(
    public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    public routes:Router,
    private changeRef: ChangeDetectorRef) { 
     
    }

  ngOnInit() {

    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        setTimeout(()=>{
          this.getProducts();
        },1000)
    
      }       
    });

    this.getProducts();
  }

  async getProducts() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });

    await loading.present();
    this.isViewEnable = false;
    await this.api.getProducts()
      .subscribe(res => {
        this.products = []
        this.products = res;
        this.changeRef.detectChanges();
        this.isViewEnable = true;
        // console.log("home page",this.products);
        loading.dismiss();
      }, err => {
        this.isViewEnable = true;
        console.log(err);
        loading.dismiss();
      });
  }

  addProduct() {
    this.router.navigate(['/product-add']);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
  }

  // fromEvent(window, 'popstate').subscribe((e) => {
  //   console.log(e, 'back button');
  // });
 

}
