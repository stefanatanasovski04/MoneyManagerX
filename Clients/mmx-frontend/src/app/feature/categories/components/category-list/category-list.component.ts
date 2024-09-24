import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategories } from 'src/app/shared/models/categories';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  constructor (private categoryService: CategoryService) {}

  getCategories() {
      this.categoryService.getCategoriesList().subscribe(data => {
        console.log(data);
      });

  }
}
