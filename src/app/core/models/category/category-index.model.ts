import { ProductIndexModel } from '../product/product-index.model';


export interface CategoryIndexModel {
  id: number;
  name: string;
  products: ProductIndexModel[];
};
