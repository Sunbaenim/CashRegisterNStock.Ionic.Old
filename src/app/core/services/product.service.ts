import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryIndexModel } from '../models/category/category-index.model';
import { ProductAddModel } from '../models/product/product-add.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  categoryUrl: string = environment.apiUrl + 'category';
  productUrl: string = environment.apiUrl + 'product';

  constructor(
    private client: HttpClient
  ) { }

  read() {
    return this.client.get<CategoryIndexModel[]>(this.categoryUrl);
  }

  create(form: ProductAddModel) {
    return this.client.post<ProductAddModel>(this.productUrl, form);
  }

}
