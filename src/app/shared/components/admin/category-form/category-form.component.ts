import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category.service';
import { CategoryIndexWithoutProductModel } from '../../../../core/models/category/category-index-without-product.model';
import { ToastService } from './../../../../core/services/toast.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {

  @Input() category: CategoryIndexWithoutProductModel;

  categoryFormGroup: FormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private cService: CategoryService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.loadCategoryFormGroup();
  }

  loadCategoryFormGroup() {
    this.categoryFormGroup = this.formBuilder.group({
      name: [this.category ? this.category.name : null, [Validators.required, Validators.maxLength(50)]]
    });
  };

  addCategory() {
    this.cService.create(this.categoryFormGroup.value).subscribe();
    this.toastService.presentToast('La catégorie a bien été ajoutée.');
  };

  updateCategory() {
    this.cService.update(this.category.id, this.categoryFormGroup.value).subscribe();
    this.toastService.presentToast('La catégorie a bien été modifiée.');
  };

}
