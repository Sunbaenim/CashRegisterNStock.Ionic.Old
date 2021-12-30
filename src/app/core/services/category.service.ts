import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryAddModel } from '../models/category/category-add.model';
import { CategoryIndexWithoutProductModel } from '../models/category/category-index-without-product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryUrl: string = environment.apiUrl + 'category';

  constructor(
    private client: HttpClient
  ) { }

  read() {
    return this.client.get<CategoryIndexWithoutProductModel[]>(this.categoryUrl);
  };

  create(form: CategoryAddModel) {
    return this.client.post<CategoryAddModel>(this.categoryUrl, form);
  };

  update(id: number, form: CategoryIndexWithoutProductModel) {
    return this.client.put<CategoryIndexWithoutProductModel>(this.categoryUrl, {id, ...form});
  };

}
