import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryIndexModel } from '../category/category-index.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  categoryUrl: string = environment.apiUrl + 'category';

  constructor(
    private client: HttpClient
  ) { }

  read() {
    return this.client.get<CategoryIndexModel[]>(this.categoryUrl);
  }
}
