import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

// implement all methods and fields from oninit interface
// to make this class more strictly
export class ProductDetailsComponent implements OnInit {

  product: IProducts;
  productSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

 ngOnInit(): void {
    this.productSubscription = this.route.data.subscribe(data => {
      this.product = data['data'];
    });
  }
}
