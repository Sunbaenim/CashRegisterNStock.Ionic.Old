import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CategoryIndexPostProductModel } from 'src/app/core/models/category/category-index-post-product.model';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-product-add-modal',
  templateUrl: './product-add-modal.component.html',
  styleUrls: ['./product-add-modal.component.scss'],
})
export class ProductAddModalComponent implements OnInit {

  @Input() openModal: boolean;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  categoryFormGroup: FormGroup = this.formBuilder.group({});

  categories: CategoryIndexPostProductModel[] = [];

  choices: string[] = ['Produit', 'Catégorie'];

  constructor(
    public addProductModalController: ModalController,
    private formBuilder: FormBuilder,
    private cService: CategoryService
  ) { }

  ngOnInit() {
    this.loadCategoryFormGroup();
  }

  dismiss() {
    this.addProductModalController.dismiss();
  };

  loadCategoryFormGroup() {
    this.categoryFormGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(50)]]
    });
  };

  addCategory() {
    this.cService.create(this.categoryFormGroup.value).subscribe();
  };

}
