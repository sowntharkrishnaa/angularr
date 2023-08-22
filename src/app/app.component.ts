import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ProductService } from './product.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  products: any[] = [];
  selectedCategory: string | null = null;
  quantity: number | null = null;

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      
    });
  }
  onSubmit() {

    this.products.forEach(product => {
      product.quantity = this.quantity;
    });
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '100vw',
      data: { products: this.products }
    });
  }
  
  filterByCategory(event: any): void {
    const selectedCategory = event.target.value;
    this.selectedCategory = selectedCategory;
  }
  
  get filteredProducts(): any[] {
    return this.selectedCategory
      ? this.products.filter(product => product.p_category === this.selectedCategory)
      : this.products;
  }

  get uniqueCategories(): string[] {
    const categories = this.products
      .filter(product => product.p_category)
      .map(product => product.p_category);

    return Array.from(new Set(categories));
  }
}
