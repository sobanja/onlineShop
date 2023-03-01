import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: IProducts[];

  constructor() {}

  ngOnInit(): void {
  }

  ngInDestroy() {

}
