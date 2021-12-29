import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CategoryIndexPostProductModel } from 'src/app/core/models/category/category-index-post-product.model';
import { CategoryService } from './../../../../core/services/category.service';
import { ProductService } from './../../../../core/services/product.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent implements OnInit {

  @Input() openModal: boolean;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  productFormGroup: FormGroup = this.formBuilder.group({});
  categoryFormGroup: FormGroup = this.formBuilder.group({});

  categories: CategoryIndexPostProductModel[] = [];

  choices: string[] = ['Produit', 'Catégorie'];

  constructor(
    public addProductModalController: ModalController,
    private formBuilder: FormBuilder,
    private cService: CategoryService,
    private pService: ProductService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.loadproductFormGroup();
    this.loadCategoryFormGroup();
  }

  dismiss() {
    this.addProductModalController.dismiss();
  };

  loadproductFormGroup() {
    this.productFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      imageURL: [''],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      price: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.min(0)]],
      categoryId: [null, [Validators.required, Validators.min(0)]]
    });
  };

  loadCategoryFormGroup() {
    this.categoryFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]]
    });
  };

  getCategories() {
    this.cService.read().subscribe(data => this.categories = data);
  };

  addProduct() {
    this.pService.create(this.productFormGroup.value).subscribe();
  };

  addCategory() {
    this.cService.create(this.categoryFormGroup.value).subscribe();
  };

  loadFile(ev) {
    const fr = new FileReader();
    fr.onload = e => this.productFormGroup.get('imageURL').setValue(e.target.result);
    fr.readAsDataURL(ev.target.files[0]);
    console.log(ev.target.files[0]);
  };

}
