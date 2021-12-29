import { Component, EventEmitter, OnInit } from '@angular/core';
import { ProductService } from './../../../core/models/services/product.service';
import { CategoryIndexModel } from './../../../core/models/category/category-index.model';
import { environment } from './../../../../environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  catalog: CategoryIndexModel[];
  baseUrl: string = environment.baseUrl;

  userLevel: string;
  isModalOpen: boolean;

  productFormGroup: FormGroup = this.formBuilder.group({});

  constructor(
    private pService: ProductService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getCatalog();
  }

  getCatalog() {
    this.pService.read().subscribe(data => this.catalog = data);
  };

}
