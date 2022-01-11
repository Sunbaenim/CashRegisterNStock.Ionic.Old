import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { CategoryIndexWithoutProductModel } from 'src/app/core/models/category/category-index-without-product.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductIndexModel } from '../../../../core/models/product/product-index.model';
import { ToastService } from './../../../../core/services/toast.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {

  @Input() product: ProductIndexModel;
  @Input() isButtonChecked: boolean;

  productFormGroup: FormGroup = this.formBuilder.group({});
  categories: CategoryIndexWithoutProductModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cService: CategoryService,
    private pService: ProductService,
    public updateProductModalController: ModalController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.loadproductFormGroup();
  }

  loadproductFormGroup() {
    this.productFormGroup = this.formBuilder.group({
      name: [this.product ? this.product.name : null, [Validators.required, Validators.maxLength(50)]],
      imageURL: [this.product ? this.product.imageURL : null],
      description: [ this.product ? this.product.description : null, [Validators.required, Validators.maxLength(255)]],
      price: [this.product ? this.product.price : null, [Validators.required, Validators.min(0)]],
      stock: [this.product ? this.product.stock : null, [Validators.min(0)]],
      categoryId: new FormControl(this.product ? this.product.categoryId : null, [Validators.required, Validators.min(0)])
    });
  };

  getCategories() {
    this.cService.read().subscribe(data => this.categories = data);
  };

  loadFile(ev) {
    const fr = new FileReader();
    fr.onload = e => this.productFormGroup.get('imageURL').setValue(e.target.result);
    fr.readAsDataURL(ev.target.files[0]);
  };

  addProduct() {
    this.pService.create(this.productFormGroup.value).subscribe(() => {
      if (this.isButtonChecked) {
        this.productFormGroup.reset();
      }
      else {
        this.updateProductModalController.dismiss();
      }
      this.toastService.presentToast('Le produit a bien été ajouté.');
    });
  };

  updateProduct() {
    this.pService.update(this.product.id, this.productFormGroup.value).subscribe(() => {
      this.updateProductModalController.dismiss();
      this.toastService.presentToast('Le produit a bien été modifié.');
    });
  };

}
