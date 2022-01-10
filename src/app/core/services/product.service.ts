import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryIndexModel } from '../models/category/category-index.model';
import { ProductAddModel } from '../models/product/product-add.model';
import { ProductChangeStockModel } from '../models/product/product-change-stock.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  categoryUrl: string = environment.apiUrl + 'category/';
  productUrl: string = environment.apiUrl + 'product/';
  productStockUrl: string = environment.apiUrl + 'product/stock';

  constructor(
    private client: HttpClient
  ) { }

  read() {
    return this.client.get<CategoryIndexModel[]>(this.categoryUrl);
  };

  create(form: ProductAddModel) {
    return this.client.post<ProductAddModel>(this.productUrl, form);
  };

  update(id: number, form: ProductAddModel) {
    return this.client.put<ProductAddModel>(this.productUrl, {id, ...form});
  };

  decrementStock(form: ProductChangeStockModel) {
    return this.client.put<ProductAddModel>(this.productStockUrl, form);
  };

  delete(id: number) {
    return this.client.delete(this.productUrl + id);
  };

}
