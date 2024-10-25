import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistDataService } from 'src/app/services/wishlist-data.service';
import productImgData from "src/assets/productsData.json";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlistdata: any;
  jsonData: any;
  productImgList:{name:string,imgUrl:string}[] = productImgData

  constructor(
    private wishlist: WishlistDataService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    wishlist.wishlistdata().subscribe((data: any) => {
      this.wishlistdata = data;
        this.jsonData = this.productImgList;
        this.wishlistdata = this.getProductsWithImages(this.wishlistdata, this.jsonData);
        console.log(this.wishlistdata);
    });
  }

  deletebtn(data: any) {
    console.log('DELETE ID', data);
    if (confirm("Are you sure to delete '" + data + "' from WishList")) {
      this.wishlist.deleteWishListDataService(data)
        .subscribe((res: any) => {
          console.log(res);
          this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/wishlist']);
        });
    }
  }
  getProductsWithImages(prod: any, js: any) {
    prod.filter((o1: any) => {
      js.some((o2: any) => {
        if (o1.product.productName === o2.name) {
          o1.product.imageUrl = o2.imgUrl
        }
      })
    })
    return prod;
  }

  ngOnInit(): void { }
}
