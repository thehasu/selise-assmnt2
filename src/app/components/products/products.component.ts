import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../_services/product.service';
import { IProduct } from '../../model/product';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ReusableDataTableComponent } from '../reusable-data-table/reusable-data-table.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    ReusableDataTableComponent,
    TranslateModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly service = inject(ProductService);
  private readonly dialog = inject(MatDialog);

  products: IProduct[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.service.getProductList().subscribe({
      next: (res: IProduct[]) => {
        this.products = [...res];
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openCreateProductModal(): void {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      width: '800px',
      height: '650px',
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addProduct(result);
      }
    });
  }

  addProduct(newProduct: IProduct): void {
    this.service.products.unshift(newProduct);
    this.service.productSubject.next(this.service.products);
    this.getProducts();
  }
}
