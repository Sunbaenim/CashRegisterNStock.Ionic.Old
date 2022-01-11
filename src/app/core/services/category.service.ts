import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CategoryAddModel } from '../models/category/category-add.model';
import { CategoryIndexWithoutProductModel } from '../models/category/category-index-without-product.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryUrl: string = environment.apiUrl + 'category/';

  private categories$: BehaviorSubject<CategoryIndexWithoutProductModel[]>;

  constructor(
    private client: HttpClient
  ) {
    this.categories$ = new BehaviorSubject<CategoryIndexWithoutProductModel[]>([]);
    this.refresh();
  }

  refresh() {
    this.client.get<CategoryIndexWithoutProductModel[]>(this.categoryUrl).subscribe(data => this.categories$.next(data));
  }

  read() {
    return this.categories$.asObservable();
  }

  create(form: CategoryAddModel) {
    return this.client.post<CategoryAddModel>(this.categoryUrl, form).pipe(finalize(() => this.refresh()));
  }

  update(id: number, form: CategoryIndexWithoutProductModel) {
    return this.client.put<CategoryIndexWithoutProductModel>(this.categoryUrl, {id, ...form}).pipe(finalize(() => this.refresh()));
  }

  delete(id: number) {
    return this.client.delete(this.categoryUrl + id).pipe(finalize(() => this.refresh()));
  }

}
