import { ProductsService } from './products.service';
import { IProducts } from '../models/products';

import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, catchError, EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProducts> {
  constructor(private ProductsService: ProductsService, private router:Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProducts> {
    return this.ProductsService.getProduct(route.params?.['id']).pipe(
      // if product with id url not exist then switch products page
      catchError(() => {
        this.router.navigate(['products']);
        return EMPTY;
      })
    );
  }
}
