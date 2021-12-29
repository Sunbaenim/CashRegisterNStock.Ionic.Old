import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryIndexPostProductModel } from '../models/category/category-index-post-product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryUrl: string = environment.apiUrl + 'category';

  constructor(
    private client: HttpClient
  ) { }

  read() {
    return this.client.get<CategoryIndexPostProductModel[]>(this.categoryUrl);
  }

}
