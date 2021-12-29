import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  addChoiceFormGroup: FormGroup = this.formBuilder.group({});

  categories: CategoryIndexPostProductModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cService: CategoryService,
    private pService: ProductService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.loadproductFormGroup();
  }

  closeModal() {
    this.openModal = false;
    this.closeModalEvent.emit(false);
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

  getCategories() {
    this.cService.read().subscribe(data => this.categories = data);
  };

  addProduct() {
    this.pService.create(this.productFormGroup.value).subscribe();
  };

  loadFile(ev) {
    const fr = new FileReader();
    fr.onload = e => this.productFormGroup.get('imageURL').setValue(e.target.result);
    fr.readAsDataURL(ev.target.files[0]);
    console.log(ev.target.files[0]);
  };

}
