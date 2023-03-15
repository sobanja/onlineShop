import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private ProductsService: ProductsService,
    public dialog: MatDialog
  ) {}
  products: IProducts[];
  productsSubscription: Subscription;
  basket: IProducts[];
  basketSubscription: Subscription;

  canEdit: boolean = false;
  canView: boolean = false;

  ngOnInit(): void {
    this.canEdit = true;

    this.productsSubscription = this.ProductsService.getProducts().subscribe(
      (data) => {
        this.products = data;
      }
    );

    this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    })
  }

  addToBasket (product: IProducts) {
    product.quantity = 1;
    let findItem;
    // check the id of the incoming product with the id of an already existing product in the basket
    // to increase its count by 1
    if (this.basket.length > 0) {
      findItem = this.basket.find(item => item.id === product.id);
      if (findItem) this.updateToBasket(findItem)
      // атйем не найден, но в корзине что-то есть, значит это новый прод.
      else this.postToBasket(product)
    } else this.postToBasket(product);
  }

   // subscribed to add data to add product in "database"
  postToBasket(product: IProducts) {
    this.ProductsService.postProductToBasket(product).subscribe((data) => 
    this.basket.push(data)
    );
  }

  // subscribe to method in PS 
   // update product by link of basket and with product id 
  updateToBasket(product: IProducts) {
    product.quantity += 1;
    this.ProductsService.updateProductToBasket(product).subscribe((data) => {})
  }

     // then product was deleted from "database" we find id in the arr of prod and delete 
  deleteItem(id: number) {
    this.ProductsService.deleteProduct(id).subscribe(() =>
      this.products.find((item) => {
        if (id === item.id) {
          let idx = this.products.findIndex((data) => data.id === id)
          this.products.splice(idx, 1);
        }
      })
    );
  }

  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    //перед закрытием данные перехватятся (подписка на обновление) и передадутся в функцию
    // либо обновляем уже существующ, либо жобавляем новые продукты
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data && data.id)
      this.updateData(data);
      else
      this.postData(data);
      }
    });
  }
  // функция обратится к сервису, передаст данные на сервер и добавит в локал массив для отображ.
  postData(data: IProducts) {
    this.ProductsService.postProduct(data).subscribe((data) =>
      this.products.push(data)
    );
  }

    // after updated product replace previous product change to a new
  updateData(product: IProducts) { 
    this.ProductsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((product) => {
        if (product.id === data.id) return data
        else return product
      })
    });
  }
  
  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }
}
