import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PRODUCTS } from '../helper/products';
import { IProduct } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: IProduct[] = PRODUCTS as IProduct[];
  public productSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    this.products
  );
  public products$: Observable<IProduct[]> = this.productSubject.asObservable();

  constructor() {}

  getProductList(): Observable<IProduct[]> {
    return this.products$;
  }

  // Function to update the product list
  updateProductList(newProducts: IProduct[]): void {
    this.productSubject.next(newProducts);
  }
}
