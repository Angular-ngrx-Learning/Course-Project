import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';


@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
   // private recipes: Recipe[] = [
   //      new Recipe('A Test Recipe',
   //      'This is simply a test',
   //      'https://www.sbs.com.au/food/sites/sbs.com.au.food/files/IMG_1105.jpg',
   //      [new Ingredient('Meat', 1),
   //       new Ingredient('French Fries', 20)]),
   //      new Recipe('Another Test Recipe',
   //      'This is simply a test',
   //      'https://media1.s-nbcnews.com/j/newscms/2018_45/1384835/googled-t-giving-recipes-today-split-main-' +
   //        '181109_6a72942a5ebea35db883b7ee6791e9e5.fit-760w.JPG',
   //      [new Ingredient('Buns', 2),
   //      new Ingredient('Meat', 1)])
   //    ];

  private recipes: Recipe[] = [];

      constructor(private slService: ShoppingListService,
                  private store: Store<fromShoppingList.AppState>) {

      }

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
       // this.slService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
      }

      addRecipe(recipe: Recipe) {
       this.recipes.push(recipe);
       this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());
      }
}
