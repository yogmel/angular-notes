import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from './../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'this is simply a test',
      'https://img.taste.com.au/-RGbsS2h/taste/2019/05/chocolate-and-nutella-smores-cake-149475-2.jpg'
    ),
  ];
  @Output() recipe = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit(): void {}

  sendRecipeDetails(recipe){
    this.recipe.emit(recipe);
  }
}
