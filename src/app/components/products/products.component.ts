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
  products: IProducts[];
  productsSubscription: Subscription;
  canEdit: boolean = false;
  canView: boolean = false;

  constructor(
    private ProductsService: ProductsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.canEdit = true;

    this.productsSubscription = this.ProductsService.getProducts().subscribe(
      (data) => {
        this.products = data;
      }
    );
  }

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
  }
}
