import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts } from '../models/products';

// decorator injectable add opportunites to provide ProductsService in DI
// to add possibility for other entities in DI use this service 
// and also add possibility for this service get some entities from DI (in constructor method)
@Injectable({
  // provided in root for the create only one instance for app
  providedIn: 'root'
})
export class ProductsService {

  // put link to properties for after work with them 
  url: string = 'https://fine-erin-vulture-boot.cyclic.app/products';
  urlBasket: string = 'https://fine-erin-vulture-boot.cyclic.app/basket';

  constructor(private http: HttpClient) { }

  // GET - для запроса ресурсов (например, веб-страниц), 
  // которые сервер возвращает в ответ на запрос клиента.
  // POST - для отправки данных на сервер для обработки. 
  // PUT - для обновления или замены существующего ресурса на сервере.
  // DELETE -  для удаления ресурса на сервере.
  // PATCH - для частичного обновления существующего ресурса на сервере.

  // for getting products from database 
  getProducts() {
    // use get method from httpclientservice that get url 
    // call method get by link url and return type IProducts[]
    return this.http.get<IProducts[]>(this.url);
  }

  getProduct(id: number) {
    return this.http.get<IProducts>(`${this.url}/${id}`);
  }

  postProduct(product: IProducts) {
    return this.http.post<IProducts>(this.url, product); 
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  updateProduct(product: IProducts) {
    return this.http.put<IProducts>(`${this.url}/${product.id}`, product); 
  }

  postProductToBasket(product: IProducts) {
    return this.http.post<IProducts>(this.urlBasket, product); 
  }

  getProductFromBasket() {
    return this.http.get<IProducts[]>(this.urlBasket);
  }

    // update product by link of basket and with product id 
  updateProductToBasket(product: IProducts) {
    return this.http.put<IProducts>(`${this.urlBasket}/${product.id}`, product); 
  }

  deleteProductFromBasket(id: number) {
    return this.http.delete<any>(`${this.urlBasket}/${id}`)
  }

}
