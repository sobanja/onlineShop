import { IProducts } from '../models/products';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IProducts[]>(this.url);
  }

  getProduct(id: number) {
    return this.http.get<IProducts>(`${this.url}/${id}`);
  }
}
